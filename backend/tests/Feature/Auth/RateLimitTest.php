<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RateLimitTest extends TestCase
{
    use RefreshDatabase;

    /** Tag requests as coming from the SPA so Sanctum uses stateful auth. */
    private function fromSpa(): static
    {
        return $this->withHeader('Referer', 'http://localhost:3000');
    }

    public function test_login_is_throttled_per_account_after_repeated_failures(): void
    {
        $admin = User::factory()->create();

        // Five failed attempts are allowed (account budget is 5/minute).
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => $admin->email,
                'password' => 'wrong-password',
            ])->assertStatus(422);
        }

        // The sixth attempt within the window is throttled.
        $this->postJson('/api/v1/auth/login', [
            'email' => $admin->email,
            'password' => 'wrong-password',
        ])->assertStatus(429);
    }

    public function test_account_throttle_does_not_block_other_accounts(): void
    {
        $a = User::factory()->create();
        $b = User::factory()->create();

        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/v1/auth/login', [
                'email' => $a->email,
                'password' => 'wrong-password',
            ])->assertStatus(422);
        }

        // A different account on the same IP is unaffected. The successful
        // login must come from the SPA (Referer) so the session store exists.
        $this->fromSpa()->postJson('/api/v1/auth/login', [
            'email' => $b->email,
            'password' => 'password',
        ])->assertOk();
    }
}
