<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\MedicalRecord;
use Illuminate\Support\Facades\Auth;

class MedicalRecordController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        if ($user->role === 'rh_admin') {
            $records = MedicalRecord::with(['fonctionnaire.user', 'medecin'])->get();
            return response()->json($records);
        }

        // If fonctionnaire, they can see their own
        if ($user->fonctionnaire) {
            $records = MedicalRecord::with(['medecin'])->where('fonctionnaire_id', $user->fonctionnaire->id)->get();
            return response()->json($records);
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fonctionnaire_id' => 'required|exists:fonctionnaires,id',
            'type' => 'required|string',
            'description' => 'required|string',
            'record_date' => 'required|date'
        ]);

        $medecin = Auth::user();

        // Optional: Ensure medecin has right specialty or department.
        $record = MedicalRecord::create([
            'fonctionnaire_id' => $request->fonctionnaire_id,
            'medecin_id' => $medecin->id,
            'type' => $request->type,
            'description' => $request->description,
            'record_date' => $request->record_date,
            'attachment_path' => $request->attachment_path ?? null
        ]);

        return response()->json(['message' => 'Medical record added successfully', 'record' => $record], 201);
    }
}
