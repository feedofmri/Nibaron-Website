<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'user_type' => $data['user_type'] ?? 'buyer'
        ]);
    }

    public function login(string $email, string $password): ?string
    {
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $user = Auth::user();
            return $user->createToken('auth-token')->plainTextToken;
        }

        return null;
    }

    public function logout(User $user): bool
    {
        $user->currentAccessToken()->delete();
        return true;
    }
}
