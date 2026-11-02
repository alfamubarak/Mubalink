<?php

use App\Http\Controllers\Api\V1\HealthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — all versioned under /api/v1
|--------------------------------------------------------------------------
|
| Every endpoint lives behind a `/v1` prefix so future breaking changes can
| be introduced as `/v2` without disturbing existing clients.
|
| Route files themselves hold no business logic — they only map an HTTP
| verb + path to a controller method (and, where needed, middleware).
*/

Route::prefix('v1')->group(function () {
    Route::get('/health', HealthController::class);

    // Authenticated example (kept for the upcoming auth milestone).
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
});
