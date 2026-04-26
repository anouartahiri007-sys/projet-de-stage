<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::with(['organization', 'grade', 'echelon'])->paginate(10);
        return response()->json([
            'data' => $employees->items(),
            'meta' => [
                'current_page' => $employees->currentPage(),
                'last_page' => $employees->lastPage(),
                'total' => $employees->total(),
            ],
            'error' => null
        ]);
    }

    public function show($id)
    {
        $employee = Employee::with(['organization', 'grade', 'echelon', 'evaluations', 'promotions'])->find($id);
        
        if (!$employee) {
            return response()->json([
                'data' => null,
                'meta' => [],
                'error' => 'Employee not found'
            ], 404);
        }

        return response()->json([
            'data' => $employee,
            'meta' => [],
            'error' => null
        ]);
    }
}
