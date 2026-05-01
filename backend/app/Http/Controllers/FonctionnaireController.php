<?php

namespace App\Http\Controllers;

use App\Models\Fonctionnaire;
use Illuminate\Http\Request;

class FonctionnaireController extends Controller
{
    public function index()
    {
        $fonctionnaires = Fonctionnaire::with('user')->get()->map(function ($f) {
            return [
                'id' => $f->id,
                'first_name' => $f->user->name, // Assuming name contains full name or split it
                'last_name' => '',
                'cin' => $f->user->cin ?? '—',
                'email' => $f->user->email,
                'grade' => $f->grade,
                'specialty' => $f->specialty ?? 'Généraliste',
                'echelon' => $f->echelon ?? 'Ech. 1',
                'rank_degree' => $f->rank_degree ?? 'Doctorat',
                'department' => $f->department ?? 'Commune',
                'status' => $f->status,
                'matricule' => $f->matricule,
            ];
        });

        return response()->json($fonctionnaires);
    }

    public function show($id)
    {
        $f = Fonctionnaire::with('user')->findOrFail($id);
        return response()->json([
            'id' => $f->id,
            'first_name' => $f->user->name,
            'last_name' => '',
            'cin' => $f->user->cin ?? '—',
            'email' => $f->user->email,
            'phone' => $f->user->phone ?? '—',
            'grade' => $f->grade,
            'specialty' => $f->specialty ?? 'Généraliste',
            'echelon' => $f->echelon ?? 'Ech. 1',
            'rank_degree' => $f->rank_degree ?? 'Doctorat',
            'department' => $f->department ?? 'Commune',
            'status' => $f->status,
            'matricule' => $f->matricule,
            'recruitment_date' => $f->recruitment_date,
        ]);
    }

    public function store(Request $request)
    {
        // To be implemented if needed
    }
}
