<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Buyer;

class RegisterController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validationRules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'user_type' => 'required|in:farmer,buyer,admin'
        ];

        // Add buyer-specific validation rules if user_type is buyer
        if ($request->user_type === 'buyer') {
            $validationRules = array_merge($validationRules, [
                'buyer_type' => 'required|in:wholesaler,retailer,exporter',
                'business_name' => 'required|string|max:255',
                'phone' => 'required|string|regex:/^(\+88)?01[3-9]\d{8}$/',
                'address' => 'required|string|min:10',
                'district' => 'required|string|max:100'
            ]);
        }

        $request->validate($validationRules);

        try {
            DB::beginTransaction();

            // Create the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => $request->user_type
            ]);

            // If user is a buyer, create buyer profile
            if ($request->user_type === 'buyer') {
                Buyer::create([
                    'user_id' => $user->id,
                    'buyer_type' => $request->buyer_type,
                    'business_name' => $request->business_name,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'district' => $request->district,
                    'verification_status' => false
                ]);

                // Load the buyer relationship
                $user->load('buyer');
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Registration successful! Please check your email for verification.',
                'data' => [
                    'user' => $user,
                    'requiresVerification' => true
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
