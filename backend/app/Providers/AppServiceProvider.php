<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Login throttling — separate budgets per IP and per account, so
        // neither a single IP rotating accounts nor a single account from
        // rotating IPs can bypass it. Limits expire after a minute (no
        // permanent lockout that could be abused for denial-of-service).
        RateLimiter::for('login', function (Request $request) {
            return [
                Limit::perMinute(20)->by($request->ip()),
                Limit::perMinute(5)->by(strtolower((string) $request->input('email', ''))),
            ];
        });
    }
}
