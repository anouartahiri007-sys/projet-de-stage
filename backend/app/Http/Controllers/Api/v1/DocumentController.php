<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Employee;
use App\Services\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    protected $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    public function index()
    {
        $docs = Document::with('user')->latest()->paginate(15);
        return response()->json(['data' => $docs]);
    }

    public function generatePromotionDecree(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
        ]);

        $employee = Employee::with(['organization'])->find($request->employee_id);

        $data = [
            'employee_name' => "{$employee->first_name} {$employee->last_name}",
            'professional_id' => $employee->professional_id,
            'action_type' => 'Grade Promotion / Echelon Progression',
            'effective_date' => now()->format('Y-m-d'),
            'location' => $employee->organization->name,
            'today' => now()->toFormattedDateString(),
        ];

        $doc = $this->documentService->generate(
            'decree', 
            $data, 
            "Promotion Decree - {$employee->last_name}", 
            "Promotion", 
            $employee,
            auth()->id() ?? 1
        );

        return response()->json(['data' => $doc, 'message' => 'Decree generated successfully']);
    }
}
