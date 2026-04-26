<?php

namespace App\Http\Controllers;

use App\Models\Concours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConcoursController extends Controller
{
    /**
     * Display a listing of the resource.
     * Public access for Candidates to view Open Concours.
     */
    public function index()
    {
        return response()->json(Concours::where('status', 'open')->get());
    }

    /**
     * Store a newly created resource in storage.
     * Protected by RoleMiddleware ('rh_admin').
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'positions_available' => 'required|integer|min:1',
            'publication_date' => 'required|date',
            'closing_date' => 'required|date|after:publication_date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $concours = Concours::create($validator->validated());

        return response()->json([
            'message' => 'Concours successfully created',
            'concours' => $concours
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Concours $concours)
    {
        return response()->json($concours);
    }
}
