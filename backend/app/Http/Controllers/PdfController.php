<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Fonctionnaire;

class PdfController extends Controller
{
    /**
     * Generate an official Attestation Document.
     */
    public function generateAttestation(Request $request, Fonctionnaire $fonctionnaire)
    {
        // Protected by middleware ensuring HR or the specific Fonctionnaire
        $user = auth('api')->user();
        if ($user->role === 'fonctionnaire' && $user->id !== $fonctionnaire->user_id) {
             return response()->json(['error' => 'Forbidden.'], 403);
        }

        $data = [
            'name' => $fonctionnaire->user->name,
            'matricule' => $fonctionnaire->matricule,
            'grade' => $fonctionnaire->grade,
            'date' => now()->format('d/m/Y'),
        ];

        // Ensure resources/views/pdf/attestation.blade.php exists
        $pdf = Pdf::loadView('pdf.attestation', $data);

        return $pdf->download("attestation_{$fonctionnaire->matricule}.pdf");
    }
}
