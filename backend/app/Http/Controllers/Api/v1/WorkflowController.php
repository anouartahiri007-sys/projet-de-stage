<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\WorkflowInstance;
use App\Services\WorkflowService;
use Illuminate\Http\Request;

class WorkflowController extends Controller
{
    protected $workflowService;

    public function __construct(WorkflowService $workflowService)
    {
        $this->workflowService = $workflowService;
    }

    public function show($id)
    {
        $instance = WorkflowInstance::with(['logs.user'])->find($id);
        if (!$instance) return response()->json(['error' => 'Not found'], 404);
        
        return response()->json(['data' => $instance]);
    }

    public function transition(Request $request, $id)
    {
        $request->validate([
            'transition' => 'required|string',
            'comment' => 'nullable|string'
        ]);

        $instance = WorkflowInstance::find($id);
        if (!$instance) return response()->json(['error' => 'Not found'], 404);

        try {
            $updated = $this->workflowService->transition($instance, $request->transition, $request->comment);
            return response()->json(['data' => $updated]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}
