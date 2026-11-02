<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates the login payload. Form Requests keep validation out of the
 * controller and let the rules be reused/unit-tested independently.
 */
class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Public endpoint — anyone may attempt to log in.
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'remember' => ['sometimes', 'boolean'],
        ];
    }
}
