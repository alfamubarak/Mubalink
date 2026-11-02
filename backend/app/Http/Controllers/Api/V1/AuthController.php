<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    /**
     * Log an admin in via Sanctum SPA cookies.
     *
     * On success the session is regenerated (defends against session
     * fixation). On failure we return a generic error — the same message
     * whether or not the email exists — so the endpoint does not leak which
     * accounts are registered.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            Log::warning('Failed login attempt', [
                'email' => $request->input('email'),
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 422);
        }

        // Regenerate the session id so a pre-login session id cannot be
        // reused against the now-authenticated session.
        $request->session()->regenerate();

        return response()->json([
            'data' => new UserResource($request->user()),
        ]);
    }

    /**
     * Log out the current admin and invalidate the session.
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out.']);
    }

    /**
     * Return the currently authenticated admin (or null via 401 middleware).
     */
    public function me(Request $request): UserResource
    {
        return new UserResource($request->user());
    }
}
