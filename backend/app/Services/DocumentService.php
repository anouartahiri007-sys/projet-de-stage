<?php

namespace App\Services;

use App\Models\Document;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentService
{
    /**
     * Generate a PDF from a blade template and store it securely.
     */
    public function generate($template, $data, $title, $type, $entity = null, $userId = 1)
    {
        $pdf = Pdf::loadView("pdf.{$template}", $data);
        
        $fileName = "documents/" . Str::uuid() . ".pdf";
        Storage::put($fileName, $pdf->output());

        return Document::create([
            'title' => $title,
            'type' => $type,
            'file_path' => $fileName,
            'entity_type' => $entity ? get_class($entity) : null,
            'entity_id' => $entity ? $entity->id : null,
            'user_id' => $userId,
            'version' => 1
        ]);
    }

    /**
     * Get a temporary secure URL for viewing the document.
     * Note: In production, use private disk and temporary URLs.
     */
    public function getDownloadUrl(Document $document)
    {
        return Storage::url($document->file_path);
    }
}
