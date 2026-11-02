<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    private const PASSWORD = 'password';
    private const GENERIC_ERROR = 'The provided credentials are incorrect.';

    private function admin(): User
    {
        return User::factory()->create();
    }

    /**
     * Tag requests as coming from the SPA so Sanctum uses stateful (cookie)
     * auth rather than token auth. Mirrors the browser's Referer header.
     */
    private function fromSpa(): static
    {
        return $this->withHeader('Referer', 'http://localhost:3000');
    }

    public function test_admin_can_log_in_with_valid_credentials(): void
    {
        $admin = $this->admin();

        $this->fromSpa()
            ->postJson('/api/v1/auth/login', [
                'email' => $admin->email,
                'password' => self::PASSWORD,
            ])
            ->assertOk()
            ->assertJson([
                'data' => [
                    'id' => $admin->id,
                    'email' => $admin->email,
                ],
            ])
            ->assertJsonMissing(['password', 'remember_token']);

        $this->assertAuthenticatedAs($admin);
    }

    public function test_login_fails_with_wrong_password(): void
    {
        $admin = $this->admin();

        $this->postJson('/api/v1/auth/login', [
            'email' => $admin->email,
            'password' => 'wrong-password',
        ])
            ->assertStatus(422)
            ->assertJson(['message' => self::GENERIC_ERROR]);

        $this->assertGuest();
    }

    public function test_login_fails_with_unknown_email_using_same_generic_message(): void
    {
        // Same error as a wrong password, so the endpoint does not reveal
        // whether an account exists (prevents user enumeration).
        $this->postJson('/api/v1/auth/login', [
            'email' => 'nobody@example.com',
            'password' => self::PASSWORD,
        ])
            ->assertStatus(422)
            ->assertJson(['message' => self::GENERIC_ERROR]);
    }

    public function test_login_validates_required_fields(): void
    {
        $this->postJson('/api/v1/auth/login', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    public function test_logged_in_admin_can_retrieve_their_profile(): void
    {
        $admin = $this->admin();

        $this->fromSpa()->postJson('/api/v1/auth/login', [
            'email' => $admin->email,
            'password' => self::PASSWORD,
        ]);

        $this->fromSpa()
            ->getJson('/api/v1/auth/me')
            ->assertOk()
            ->assertJson(['data' => ['id' => $admin->id, 'email' => $admin->email]]);
    }

    public function test_logout_invalidates_the_session(): void
    {
        $admin = $this->admin();

        $this->fromSpa()->postJson('/api/v1/auth/login', [
            'email' => $admin->email,
            'password' => self::PASSWORD,
        ])->assertOk();

        $this->fromSpa()
            ->postJson('/api/v1/auth/logout')
            ->assertOk();

        // Reset cached guards so the next request re-resolves auth from the
        // now-cleared session — mirrors a fresh HTTP request/container (in
        // production each request boots a new container; the test container
        // is shared, so the sanctum guard would otherwise return a stale user).
        Auth::forgetGuards();

        $this->fromSpa()
            ->getJson('/api/v1/auth/me')
            ->assertStatus(401);
    }

    public function test_unauthenticated_user_cannot_access_profile(): void
    {
        $this->fromSpa()
            ->getJson('/api/v1/auth/me')
            ->assertStatus(401);
    }
}
