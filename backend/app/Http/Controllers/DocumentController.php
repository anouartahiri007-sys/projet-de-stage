<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Candidature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * List official documents.
     */
    public function index()
    {
        return response()->json(Document::whereNull('candidature_id')->latest()->get());
    }

    /**
     * Upload a document (RH or Candidate).
     */
    public function upload(Request $request)
    {
        $request->validate([
            'candidature_id' => 'nullable|exists:candidatures,id',
            'document_type' => 'required|string',
            'file' => 'required|mimes:pdf,doc,docx,jpg,jpeg,png|max:10240', // 10MB
        ]);

        $path = $request->file('file')->store('documents', 'public');

        $document = Document::create([
            'candidature_id' => $request->candidature_id,
            'name' => $request->file('file')->getClientOriginalName(),
            'file_path' => $path,
            'document_type' => $request->document_type,
            'is_verified' => true
        ]);

        return response()->json([
            'message' => 'Document uploaded successfully.',
            'document' => $document
        ], 201);
    }

    /**
     * Download a specific document.
     */
    public function download(Document $document)
    {
        if (!Storage::disk('public')->exists($document->file_path)) {
            return response()->json(['message' => 'File not found on server.'], 404);
        }

        return Storage::disk('public')->download($document->file_path, $document->name);
    }
}
