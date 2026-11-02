<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\HealthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — all versioned under /api/v1
|--------------------------------------------------------------------------
|
| Every endpoint lives behind a `/v1` prefix so future breaking changes can
| be introduced as `/v2` without disturbing existing clients.
*/

Route::prefix('v1')->group(function () {
    // Public health probe.
    Route::get('/health', HealthController::class);

    // Authentication.
    Route::post('/auth/login', [AuthController::class, 'login'])
        ->middleware('throttle:login');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
    });
});
