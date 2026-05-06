<?php

namespace App\Http\Controllers;

use App\Models\Fonctionnaire;
use Illuminate\Http\Request;

class FonctionnaireController extends Controller
{
    public function index()
    {
        $fonctionnaires = Fonctionnaire::with('user')->get();
        return response()->json($fonctionnaires);
    }

    public function show($id)
    {
        $f = Fonctionnaire::with('user')->findOrFail($id);
        return response()->json($f);
    }

    public function getNextMatricule()
    {
        $last = Fonctionnaire::where('matricule', 'like', '1961-%')
            ->orderBy('matricule', 'desc')
            ->first();

        if (!$last) {
            return response()->json(['matricule' => '1961-001']);
        }

        $lastNumber = (int) substr($last->matricule, 5);
        $nextNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);

        return response()->json(['matricule' => '1961-' . $nextNumber]);
    }

    public function update(Request $request, $id)
    {
        $fonctionnaire = Fonctionnaire::findOrFail($id);
        
        $validated = $request->validate([
            'nom' => 'required|string',
            'nom_ar' => 'required|string',
            'prenom' => 'required|string',
            'prenom_ar' => 'required|string',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string',
            'lieu_naissance_ar' => 'required|string',
            'situation_familiale' => 'required|string',
            'nombre_enfants' => 'nullable|integer',
            'cnie' => 'required|string|unique:fonctionnaires,cnie,' . $id,
            'telephone' => 'required|string',
            'email_perso' => 'required|email',
            'recruitment_date' => 'required|date',
            'grade' => 'required|string',
            'echelon' => 'required|string',
            'date_grade' => 'required|date',
            'date_echelon' => 'required|date',
            'direction' => 'required|string',
            'role' => 'required|string',
            'sexe' => 'required|string'
        ]);

        \Illuminate\Support\Facades\DB::beginTransaction();
        try {
            // Update User if exists
            if ($fonctionnaire->user_id) {
                $user = \App\Models\User::find($fonctionnaire->user_id);
                if ($user) {
                    $user->update([
                        'name' => $validated['prenom'] . ' ' . $validated['nom'],
                        'role' => strtolower($validated['role']),
                    ]);
                }
            }

            // Update Fonctionnaire
            $fonctionnaire->update(array_merge($validated, [
                'poste' => $validated['role']
            ]));

            \Illuminate\Support\Facades\DB::commit();

            return response()->json([
                'message' => 'Employee updated successfully',
                'fonctionnaire' => $fonctionnaire
            ]);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\DB::rollBack();
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'nom_ar' => 'required|string',
            'prenom' => 'required|string',
            'prenom_ar' => 'required|string',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string',
            'lieu_naissance_ar' => 'required|string',
            'situation_familiale' => 'required|string',
            'nombre_enfants' => 'nullable|integer',
            'cnie' => 'required|string|unique:fonctionnaires,cnie',
            'telephone' => 'required|string',
            'email_perso' => 'required|email',
            'recruitment_date' => 'required|date',
            'grade' => 'required|string',
            'echelon' => 'required|string',
            'date_grade' => 'required|date',
            'date_echelon' => 'required|date',
            'direction' => 'required|string',
            'role' => 'required|string',
            'sexe' => 'required|string'
        ]);

        \Illuminate\Support\Facades\DB::beginTransaction();
        try {
            // 1. Auto-generate Matricule
            $last = Fonctionnaire::where('matricule', 'like', '1961-%')->orderBy('matricule', 'desc')->first();
            $lastNumber = $last ? (int) substr($last->matricule, 5) : 0;
            $matricule = '1961-' . str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);

            // 2. Generate Credentials
            $baseEmail = \Illuminate\Support\Str::slug($validated['prenom']) . '.' . \Illuminate\Support\Str::slug($validated['nom']);
            $email = $baseEmail . '@larache.ma';
            
            $count = \App\Models\User::where('email', $email)->count();
            if ($count > 0) {
                $email = $baseEmail . ($count + 1) . '@larache.ma';
            }

            $password = \Illuminate\Support\Str::random(10);

            // 3. Create User
            $user = \App\Models\User::create([
                'name' => $validated['prenom'] . ' ' . $validated['nom'],
                'email' => $email,
                'password' => \Illuminate\Support\Facades\Hash::make($password),
                'role' => strtolower($validated['role']),
            ]);

            // 4. Create Fonctionnaire
            $fonctionnaire = Fonctionnaire::create(array_merge($validated, [
                'user_id' => $user->id,
                'matricule' => $matricule,
                'poste' => $validated['role'], // Use role as poste if needed or leave empty
            ]));

            // 5. Generate PDF
            $html = view('pdf.employee_onboarding', [
                'fonctionnaire' => $fonctionnaire,
                'user' => $user,
                'password' => $password
            ])->render();

            $pdfFileName = 'onboarding_' . $fonctionnaire->matricule . '.pdf';
            $pdfPath = storage_path('app/public/documents/rh/' . $pdfFileName);
            
            if (!file_exists(dirname($pdfPath))) {
                mkdir(dirname($pdfPath), 0755, true);
            }

            \Spatie\Browsershot\Browsershot::html($html)
                ->format('A4')
                ->noSandbox()
                ->save($pdfPath);

            // 6. Send Email
            \Illuminate\Support\Facades\Mail::to($validated['email_perso'])
                ->send(new \App\Mail\EmployeeOnboardingMail($fonctionnaire, $user, $password, $pdfPath));

            \Illuminate\Support\Facades\DB::commit();

            return response()->json([
                'message' => 'Employee created successfully',
                'fonctionnaire' => $fonctionnaire,
                'email' => $email,
                'password' => $password,
                'matricule' => $matricule
            ], 201);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\DB::rollBack();
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    public function downloadOnboardingPdf($id)
    {
        $fonctionnaire = Fonctionnaire::findOrFail($id);
        $pdfFileName = 'onboarding_' . $fonctionnaire->matricule . '.pdf';
        $pdfPath = storage_path('app/public/documents/rh/' . $pdfFileName);

        if (!file_exists($pdfPath)) {
            return response()->json(['message' => 'PDF not found'], 404);
        }

        return response()->download($pdfPath, $pdfFileName, [
            'Content-Type' => 'application/pdf',
        ]);
    }

    public function destroy($id)
    {
        $fonctionnaire = Fonctionnaire::findOrFail($id);
        $userId = $fonctionnaire->user_id;

        \Illuminate\Support\Facades\DB::beginTransaction();
        try {
            // Delete Fonctionnaire (Cascade will handle dependent records like leaves, payrolls)
            $fonctionnaire->delete();

            // Delete associated User if exists
            if ($userId) {
                \App\Models\User::where('id', $userId)->delete();
            }

            \Illuminate\Support\Facades\DB::commit();
            return response()->json(['message' => 'Employee and associated user deleted successfully']);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\DB::rollBack();
            return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
        }
    }
}
