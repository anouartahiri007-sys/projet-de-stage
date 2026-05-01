<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Candidat;
use App\Models\Fonctionnaire;
use App\Models\RH;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:candidat,fonctionnaire,rh_admin',
            // Profile specific fields (nullable so Laravel's ConvertEmptyStringsToNull doesn't trigger "must be string" on role=rh_admin)
            'cin' => 'nullable|required_if:role,candidat|string|unique:candidats,cin',
            'first_name' => 'nullable|required_if:role,candidat|string',
            'last_name' => 'nullable|required_if:role,candidat|string',
            'department' => 'nullable|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
                    $validator->validated(),
                    ['password' => Hash::make($request->password)]
                ));

        // Create the associated profile structure based on Role
        if ($user->role === 'candidat') {
            Candidat::create([
                'user_id' => $user->id,
                'cin' => $request->cin,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ]);
        } elseif ($user->role === 'rh_admin') {
            RH::create([
                'user_id' => $user->id,
                'department' => $request->department ?? 'Direction Centrale',
            ]);
        }

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth('api')->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }

    /**
     * Candidat Registration
     */
    public function candidatRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100|unique:users',
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'cin' => 'required|string|unique:candidats,cin',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        // Generate Code Candidat
        $code = 'CAND-' . strtoupper(\Illuminate\Support\Str::random(6));

        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'password' => Hash::make(\Illuminate\Support\Str::random(12)), // unused basically
            'role' => 'candidat'
        ]);

        $candidat = Candidat::create([
            'user_id' => $user->id,
            'code_candidat' => $code,
            'cin' => $request->cin,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
        ]);

        // Send Real Email
        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\CandidatCodeMail($code, $user->name));
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error("Failed to send email to {$user->email}: " . $e->getMessage());
            // We still return 201 because the account was created, 
            // but in production, you might want to handle this differently.
        }

        return response()->json([
            'message' => 'Compte créé avec succès. Votre code a été envoyé par email.',
            'code_candidat' => $code // Sending it back for testing purposes
        ], 201);
    }

    /**
     * Candidat Login with Code
     */
    public function candidatLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code_candidat' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $candidat = Candidat::where('code_candidat', $request->code_candidat)->first();

        if (!$candidat) {
            return response()->json(['error' => 'Code Candidat invalide'], 401);
        }

        $user = $candidat->user;
        $token = auth('api')->login($user);

        return $this->createNewToken($token);
    }
}
