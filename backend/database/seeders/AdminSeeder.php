<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Local-development admin account only. Never run in production.
 *
 *   email:    admin@mubalink.ng
 *   password: password
 */
class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'MubaLink Admin',
            'email' => 'admin@mubalink.ng',
        ]);
    }
}
