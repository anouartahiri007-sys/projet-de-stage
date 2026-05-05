<?php

namespace App\Http\Controllers;

use App\Models\Candidature;
use App\Models\Concours;
use Illuminate\Http\Request;

class CandidatureController extends Controller
{
    /**
     * Store a newly created Candidature.
     * Protected by auth and candidat role.
     */
    public function apply(Request $request, $concours_id)
    {
        $user = auth('api')->user();
        if ($user->role !== 'candidat') {
            return response()->json(['error' => 'Only candidates can apply.'], 403);
        }

        $concours = Concours::findOrFail($concours_id);
        
        if ($concours->status !== 'open') {
            return response()->json(['error' => 'This concours is no longer open.'], 400);
        }

        // Check for existing application
        $candidat = \App\Models\Candidat::where('user_id', $user->id)->first();
        
        if (!$candidat) {
             return response()->json(['error' => 'Candidate profile not found.'], 404);
        }

        $exists = Candidature::where('candidat_id', $candidat->id)
                    ->where('concours_id', $concours->id)
                    ->exists();

        if ($exists) {
            return response()->json(['error' => 'You have already applied to this concours.'], 409);
        }

        $candidature = Candidature::create([
            'candidat_id' => $candidat->id,
            'concours_id' => $concours->id,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Application submitted successfully',
            'candidature' => $candidature
        ], 201);
    }

    /**
     * HR Admin: Update the status of an application.
     */
    public function updateStatus(Request $request, Candidature $candidature)
    {
        // Protected by HR Admin Middleware
        $request->validate([
            'status' => 'required|in:pending,reviewed,accepted,rejected',
        ]);

        $candidature->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Candidature status updated.',
            'candidature' => $candidature
        ]);
    }

    /**
     * Get applications for the authenticated candidate.
     */
    public function myCandidatures()
    {
        $user = auth('api')->user();
        if ($user->role !== 'candidat') {
            return response()->json(['error' => 'Only candidates can view their applications.'], 403);
        }

        $candidat = \App\Models\Candidat::where('user_id', $user->id)->first();
        
        if (!$candidat) {
             return response()->json(['error' => 'Candidate profile not found.'], 404);
        }

        $candidatures = Candidature::with('concours')
            ->where('candidat_id', $candidat->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($candidatures);
    }

    /**
     * Get all candidatures for HR Admin.
     */
    public function index()
    {
        return response()->json(Candidature::with(['candidat', 'concours'])->latest()->get());
    }
}
