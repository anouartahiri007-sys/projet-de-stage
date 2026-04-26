<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        if (!auth('api')->check()) {
            return response()->json(['error' => 'Unauthorized. Please login.'], 401);
        }

        $user = auth('api')->user();

        if (!in_array($user->role, $roles)) {
            return response()->json(['error' => 'Forbidden. You do not have the required role.'], 403);
        }

        return $next($request);
    }
}
