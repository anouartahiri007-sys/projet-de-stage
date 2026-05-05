<?php

namespace App\Http\Controllers;

use App\Models\AdministrativeAct;
use App\Models\AdministrativeActVersion;
use App\Models\Fonctionnaire;
use App\Models\Candidat;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Spatie\Browsershot\Browsershot;

class AdministrativeActController extends Controller
{
    public function index()
    {
        return response()->json(
            AdministrativeAct::with(['fonctionnaire', 'candidat'])
                ->withCount('versions')
                ->latest()
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:recrutement,nomination,titularisation,notation,avancement,reclassement',
            'fonctionnaire_id' => 'nullable|exists:fonctionnaires,id',
            'candidat_id' => 'nullable|exists:candidats,id',
            'new_data' => 'required|array',
            'status' => 'string|in:draft,validated'
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $originalData = null;
            if ($request->fonctionnaire_id) {
                $originalData = Fonctionnaire::find($request->fonctionnaire_id)->toArray();
            } elseif ($request->candidat_id) {
                $originalData = Candidat::find($request->candidat_id)->toArray();
            }

            if ($validated['type'] === 'notation') {
                $validated['new_data'] = $this->calculateNotation($validated['new_data']);
            }

            $act = AdministrativeAct::create([
                'type' => $validated['type'],
                'fonctionnaire_id' => $validated['fonctionnaire_id'],
                'candidat_id' => $validated['candidat_id'],
                'original_data' => $originalData,
                'new_data' => $validated['new_data'],
                'status' => $validated['status'] ?? 'draft',
                'created_by' => Auth::id() ?? 1,
                'current_version' => 1
            ]);

            // Create initial version
            AdministrativeActVersion::create([
                'administrative_act_id' => $act->id,
                'version_number' => 1,
                'data' => $validated['new_data'],
                'created_by' => Auth::id() ?? 1
            ]);

            // Specialized record for Nomination
            if ($validated['type'] === 'nomination') {
                \App\Models\NominationRecord::create(array_merge($validated['new_data'], [
                    'fonctionnaire_id' => $validated['fonctionnaire_id'],
                    'administrative_act_id' => $act->id
                ]));
            }

            // Specialized record for Reclassement
            if ($validated['type'] === 'reclassement') {
                \App\Models\ReclassementRecord::create(array_merge($validated['new_data'], [
                    'fonctionnaire_id' => $validated['fonctionnaire_id'],
                    'administrative_act_id' => $act->id
                ]));
            }

            // Specialized record for Recrutement
            if ($validated['type'] === 'recrutement') {
                \App\Models\RecrutementRecord::create(array_merge($validated['new_data'], [
                    'candidat_id' => $validated['candidat_id'],
                    'administrative_act_id' => $act->id
                ]));
            }

            // Specialized record for Titularisation
            if ($validated['type'] === 'titularisation') {
                \App\Models\TitularisationRecord::create(array_merge($validated['new_data'], [
                    'fonctionnaire_id' => $validated['fonctionnaire_id'],
                    'administrative_act_id' => $act->id
                ]));
            }

            return response()->json($act->load('versions'), 201);
        });
    }

    public function update(Request $request, AdministrativeAct $act)
    {
        if ($act->status === 'installed') {
            return response()->json(['message' => 'Cannot modify an installed act'], 422);
        }

        $validated = $request->validate([
            'new_data' => 'required|array',
            'status' => 'string|in:draft,validated'
        ]);

        return DB::transaction(function () use ($act, $validated) {
            if ($act->type === 'notation') {
                $validated['new_data'] = $this->calculateNotation($validated['new_data']);
            }

            $newVersionNumber = $act->current_version + 1;

            $act->update([
                'new_data' => $validated['new_data'],
                'status' => $validated['status'] ?? $act->status,
                'current_version' => $newVersionNumber
            ]);

            AdministrativeActVersion::create([
                'administrative_act_id' => $act->id,
                'version_number' => $newVersionNumber,
                'data' => $validated['new_data'],
                'created_by' => Auth::id() ?? 1
            ]);

            // Sync Specialized record for Nomination
            if ($act->type === 'nomination') {
                \App\Models\NominationRecord::updateOrCreate(
                    ['administrative_act_id' => $act->id],
                    array_merge($validated['new_data'], ['fonctionnaire_id' => $act->fonctionnaire_id])
                );
            }

            // Sync Specialized record for Reclassement
            if ($act->type === 'reclassement') {
                \App\Models\ReclassementRecord::updateOrCreate(
                    ['administrative_act_id' => $act->id],
                    array_merge($validated['new_data'], ['fonctionnaire_id' => $act->fonctionnaire_id])
                );
            }

            // Sync Specialized record for Recrutement
            if ($act->type === 'recrutement') {
                \App\Models\RecrutementRecord::updateOrCreate(
                    ['administrative_act_id' => $act->id],
                    array_merge($validated['new_data'], ['candidat_id' => $act->candidat_id])
                );
            }

            // Sync Specialized record for Titularisation
            if ($act->type === 'titularisation') {
                \App\Models\TitularisationRecord::updateOrCreate(
                    ['administrative_act_id' => $act->id],
                    array_merge($validated['new_data'], ['fonctionnaire_id' => $act->fonctionnaire_id])
                );
            }

            return response()->json($act->load('versions'));
        });
    }

    public function install(AdministrativeAct $act)
    {
        if ($act->status === 'installed') {
            return response()->json(['message' => 'Act already installed'], 422);
        }

        return DB::transaction(function () use ($act) {
            $data = $act->new_data;

            // Business Logic for Installation based on Type
            if ($act->type === 'recrutement' && $act->candidat_id) {
                // Logic to convert Candidat to Fonctionnaire would go here
                // For now, mark as installed
            } elseif ($act->fonctionnaire_id) {
                $employee = Fonctionnaire::find($act->fonctionnaire_id);
                
                if ($act->type === 'notation') {
                    // Update employee performance note
                    $employee->update(['note_last_eval' => $data['note'] ?? $data['notation']['note'] ?? null]);
                } elseif ($act->type === 'avancement' || $act->type === 'reclassement') {
                    // Update employee grade and echelon
                    $employee->update([
                        'grade' => $data['nouveau_grade'] ?? $employee->grade,
                        'echelon' => $data['nouvel_echelon'] ?? $employee->echelon
                    ]);
                }
            }

            $act->update([
                'status' => 'installed',
                'installed_at' => now()
            ]);

            return response()->json(['message' => 'Act installed successfully', 'act' => $act]);
        });
    }

    // Show a specific administrative act with related data
    public function show(AdministrativeAct $act)
    {
        return response()->json($act->load(['versions', 'fonctionnaire', 'candidat']));
    }


    public function generatePdf(AdministrativeAct $act)
    {
        $viewMap = [
            'recrutement'    => 'arrete_recruter',
            'nomination'     => 'arrete_nomination',
            'titularisation' => 'arrete_titularisation',
            'notation'       => 'notation',
            'avancement'     => 'arrete_avancement',
            'reclassement'   => 'arrete_reclassement',
        ];

        $view = $viewMap[$act->type] ?? 'notation';
        
        // For recruitment acts, the subject is the candidat. For others, it's the fonctionnaire.
        $subject = $act->type === 'recrutement' ? $act->candidat : $act->fonctionnaire;
        
        $nomination = null;
        if ($act->type === 'nomination') {
            $nomination = \App\Models\NominationRecord::where('administrative_act_id', $act->id)->first();
        }

        $reclassement = null;
        if ($act->type === 'reclassement') {
            $reclassement = \App\Models\ReclassementRecord::where('administrative_act_id', $act->id)->first();
        }

        $recrutement = null;
        if ($act->type === 'recrutement') {
            $recrutement = \App\Models\RecrutementRecord::where('administrative_act_id', $act->id)->first();
        }

        $titularisation = null;
        if ($act->type === 'titularisation') {
            $titularisation = \App\Models\TitularisationRecord::where('administrative_act_id', $act->id)->first();
        }

        $html = view($view, [
            'act' => $act,
            'acte' => $act, // Legacy support for blades using $acte
            'fonctionnaire' => $subject, // Treat subject as fonctionnaire in blades
            'candidat' => $act->candidat,
            'contenu' => $act->new_data,
            'nomination' => $nomination,
            'reclassement' => $reclassement,
            'recrutement' => $recrutement,
            'titularisation' => $titularisation,
            'date_formatted' => now()->format('d/m/Y'),
            'today' => now()->format('d/m/Y'),
            'location' => $act->new_data['lieu_redaction'] ?? 'Larache'
        ])->render();

        $pdfContent = Browsershot::html($html)
            ->format('A4')
            ->margins(10, 10, 10, 10)
            ->noSandbox()
            ->pdf();

        return response($pdfContent)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"{$act->type}_{$act->id}_v{$act->current_version}.pdf\"");
    }

    private function calculateNotation(array $data)
    {
        $n_taches = floatval($data['note_taches'] ?? 0);
        $n_rendement = floatval($data['note_rendement'] ?? 0);
        $n_organisation = floatval($data['note_organisation'] ?? 0);
        $n_comportement = floatval($data['note_comportement'] ?? 0);
        $n_recherche = floatval($data['note_recherche'] ?? 0);

        $total = $n_taches + $n_rendement + $n_organisation + $n_comportement + $n_recherche;

        $data['note'] = $total;

        if ($total >= 18) $data['mention'] = 'ممتاز';
        else if ($total >= 16) $data['mention'] = 'جيد جداً';
        else if ($total >= 14) $data['mention'] = 'جيد';
        else if ($total >= 10) $data['mention'] = 'متوسط';
        else $data['mention'] = 'ضعيف';

        if ($total >= 16) $data['rythme'] = 'rapide';
        else if ($total >= 10) $data['rythme'] = 'moyen';
        else $data['rythme'] = 'lent';

        return $data;
    }
}
