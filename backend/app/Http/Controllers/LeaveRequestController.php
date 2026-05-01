<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\LeaveRequest;
use Illuminate\Support\Facades\Auth;

class LeaveRequestController extends Controller
{
    public function index()
    {
        $leaves = LeaveRequest::with('fonctionnaire.user')->get();
        return response()->json($leaves);
    }

    public function myLeaves()
    {
        $user = Auth::user();
        if (!$user || !$user->fonctionnaire) {
            return response()->json(['message' => 'Fonctionnaire not found'], 404);
        }

        $leaves = LeaveRequest::where('fonctionnaire_id', $user->fonctionnaire->id)->get();
        return response()->json($leaves);
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
        ]);

        $user = Auth::user();
        if (!$user || !$user->fonctionnaire) {
            return response()->json(['message' => 'Fonctionnaire not found'], 404);
        }

        $leave = LeaveRequest::create([
            'fonctionnaire_id' => $user->fonctionnaire->id,
            'type' => $request->type,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'reason' => $request->reason,
            'status' => 'pending'
        ]);

        return response()->json(['message' => 'Leave request submitted successfully', 'leave' => $leave], 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected'
        ]);

        $leave = LeaveRequest::findOrFail($id);
        $leave->status = $request->status;
        $leave->save();

        return response()->json(['message' => 'Leave request status updated', 'leave' => $leave]);
    }
}
