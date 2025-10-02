<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $settings = $user->settings()->first();

        if (!$settings) {
            // Create default settings
            $settings = UserSetting::create([
                'user_id' => $user->id,
                'notifications' => [
                    'email_notifications' => true,
                    'push_notifications' => true,
                    'order_updates' => true,
                    'marketing_emails' => false,
                    'price_alerts' => true,
                    'weather_alerts' => true
                ],
                'preferences' => [
                    'theme' => 'light',
                    'language' => 'en',
                    'currency' => 'BDT',
                    'timezone' => 'Asia/Dhaka'
                ]
            ]);
        }

        return response()->json([
            'status' => 'success',
            'data' => $settings
        ]);
    }

    public function updateNotifications(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'order_updates' => 'boolean',
            'marketing_emails' => 'boolean',
            'price_alerts' => 'boolean',
            'weather_alerts' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();
        $settings = $user->settings()->firstOrCreate(['user_id' => $user->id]);

        $notifications = array_merge($settings->notifications ?? [], $request->only([
            'email_notifications', 'push_notifications', 'order_updates',
            'marketing_emails', 'price_alerts', 'weather_alerts'
        ]));

        $settings->update(['notifications' => $notifications]);

        return response()->json([
            'status' => 'success',
            'message' => 'Notification settings updated successfully',
            'data' => $settings
        ]);
    }

    public function updatePreferences(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'theme' => 'in:light,dark',
            'language' => 'in:en,bn',
            'currency' => 'in:BDT,USD',
            'timezone' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();
        $settings = $user->settings()->firstOrCreate(['user_id' => $user->id]);

        $preferences = array_merge($settings->preferences ?? [], $request->only([
            'theme', 'language', 'currency', 'timezone'
        ]));

        $settings->update(['preferences' => $preferences]);

        return response()->json([
            'status' => 'success',
            'message' => 'Preferences updated successfully',
            'data' => $settings
        ]);
    }

    public function deleteAccount(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'confirmation' => 'required|in:DELETE_MY_ACCOUNT'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $request->user();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password is incorrect'
            ], 400);
        }

        // Soft delete the user
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Account deleted successfully'
        ]);
    }
}
