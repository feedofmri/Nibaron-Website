<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Buyer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
        $profile = null;

        // Get specific profile based on user type
        if ($user->user_type === 'buyer') {
            $profile = $user->buyer()->first();
        } elseif ($user->user_type === 'farmer') {
            $profile = $user->farmer()->first();
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'user' => $user,
                'profile' => $profile
            ]
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|string|max:20',
            'address' => 'sometimes|string|max:500',
            'district' => 'sometimes|string|max:100',
            'business_name' => 'sometimes|string|max:255',
            'buyer_type' => 'sometimes|in:wholesaler,retailer,exporter',
            'avatar' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Update user data
            $userData = $request->only(['name', 'email']);
            if (!empty($userData)) {
                $user->update($userData);
            }

            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                // Delete old avatar if exists
                if ($user->avatar) {
                    Storage::disk('public')->delete($user->avatar);
                }

                $avatarPath = $request->file('avatar')->store('avatars', 'public');
                $user->update(['avatar' => $avatarPath]);
            }

            // Update profile based on user type
            if ($user->user_type === 'buyer') {
                $profileData = $request->only([
                    'phone', 'address', 'district', 'business_name', 'buyer_type'
                ]);

                if (!empty($profileData)) {
                    $user->buyer()->updateOrCreate(
                        ['user_id' => $user->id],
                        $profileData
                    );
                }
            }

            $user->refresh();
            $profile = $user->user_type === 'buyer' ? $user->buyer : null;

            return response()->json([
                'status' => 'success',
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => $user,
                    'profile' => $profile
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update profile',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function changePassword(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Current password is incorrect'
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password changed successfully'
        ]);
    }
}
