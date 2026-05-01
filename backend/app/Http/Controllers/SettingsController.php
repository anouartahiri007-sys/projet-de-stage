<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Notifications\SystemAlert;

class SettingsController extends Controller
{
    public function getSettings(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'account' => [
                'name' => $user->name,
                'email' => $user->email,
                'department' => $user->department ?? '',
                'phone' => $user->phone ?? '',
                'language' => $user->language ?? 'fr',
            ],
            'preferences' => $user->preferences ?? [
                'candidatures' => true,
                'documents' => true,
                'concours' => true,
                'email' => false,
                'sms' => false,
            ]
        ]);
    }

    public function updateSettings(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'account.name' => 'required|string|max:255',
            'account.email' => 'required|email|max:255|unique:users,email,'.$user->id,
            'account.department' => 'nullable|string|max:255',
            'account.phone' => 'nullable|string|max:20',
            'account.language' => 'required|string|in:fr,ar',
            'preferences' => 'required|array',
            
            // Password update fields
            'current_password' => 'nullable|string',
            'new_password' => 'nullable|string|min:8',
        ]);

        // Handle password update if provided
        if (!empty($validated['current_password']) && !empty($validated['new_password'])) {
            if (!Hash::check($validated['current_password'], $user->password)) {
                throw ValidationException::withMessages([
                    'current_password' => ['Le mot de passe actuel est incorrect.'],
                ]);
            }
            $user->password = Hash::make($validated['new_password']);
        }

        $user->name = $validated['account']['name'];
        $user->email = $validated['account']['email'];
        $user->department = $validated['account']['department'] ?? null;
        $user->phone = $validated['account']['phone'] ?? null;
        $user->language = $validated['account']['language'];
        $user->preferences = $validated['preferences'];
        
        $user->save();

        // Dispatch notification
        $user->notify(new SystemAlert(
            'Paramètres mis à jour',
            'Vos préférences système et informations de compte ont été modifiées avec succès.'
        ));

        return response()->json([
            'message' => 'Paramètres sauvegardés avec succès.',
            'user' => $user
        ]);
    }
}
