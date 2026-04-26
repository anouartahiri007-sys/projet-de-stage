<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Candidature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Upload a document for a specific candidature.
     */
    public function upload(Request $request)
    {
        // Enforce 5MB limit
        $request->validate([
            'candidature_id' => 'required|exists:candidatures,id',
            'document_type' => 'required|string|in:cv,cin,diplome,autre',
            'file' => 'required|mimes:pdf,jpg,jpeg,png|max:5120', // 5MB Limit = 5120 KB
        ]);

        $candidature = Candidature::findOrFail($request->candidature_id);
        
        $path = $request->file('file')->store('documents', 'local');

        $document = Document::create([
            'candidature_id' => $candidature->id,
            'name' => $request->file('file')->getClientOriginalName(),
            'file_path' => $path,
            'document_type' => $request->document_type,
            'is_verified' => false
        ]);

        return response()->json([
            'message' => 'Document uploaded securely.',
            'document' => $document
        ], 201);
    }
}
