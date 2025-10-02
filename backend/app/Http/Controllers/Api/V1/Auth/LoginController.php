<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);

        // Find user by email
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password'
            ], 401);
        }

        // Load appropriate relationships based on user type
        switch ($user->user_type) {
            case 'buyer':
                $user->load('buyer');
                break;
            case 'farmer':
                $user->load(['farmer', 'farmer.farms']);
                break;
            case 'admin':
                // Admin doesn't need additional relationships
                break;
        }

        // Create authentication token
        $tokenName = 'auth-token';
        if ($user->user_type === 'buyer' && $user->buyer) {
            $tokenName = $user->buyer->buyer_type . '-token';
        }

        $token = $user->createToken($tokenName)->plainTextToken;

        // Prepare response data based on user type
        $responseData = [
            'user' => $user,
            'token' => $token,
            'user_type' => $user->user_type
        ];

        // Add buyer-specific data if applicable
        if ($user->user_type === 'buyer' && $user->buyer) {
            $responseData['buyer_profile'] = [
                'buyer_type' => $user->buyer->buyer_type,
                'business_name' => $user->buyer->business_name,
                'phone' => $user->buyer->phone,
                'address' => $user->buyer->address,
                'district' => $user->buyer->district,
                'verification_status' => $user->buyer->verification_status,
                'profile_image' => $user->buyer->profile_image
            ];
        }

        // Add farmer-specific data if applicable
        if ($user->user_type === 'farmer' && $user->farmer) {
            $responseData['farmer_profile'] = [
                'nid' => $user->farmer->nid,
                'phone' => $user->farmer->phone,
                'address' => $user->farmer->address,
                'district' => $user->farmer->district,
                'farming_experience' => $user->farmer->farming_experience,
                'total_land' => $user->farmer->total_land,
                'verification_status' => $user->farmer->verification_status,
                'farms_count' => $user->farmer->farms->count()
            ];
        }

        return response()->json([
            'success' => true,
            'message' => $this->getWelcomeMessage($user),
            'data' => $responseData
        ]);
    }

    private function getWelcomeMessage(User $user): string
    {
        $timeOfDay = $this->getTimeOfDay();

        switch ($user->user_type) {
            case 'buyer':
                if ($user->buyer) {
                    $buyerTypeLabel = ucfirst($user->buyer->buyer_type);
                    return "Good {$timeOfDay}, {$user->name}! Welcome back to your {$buyerTypeLabel} dashboard.";
                }
                return "Good {$timeOfDay}, {$user->name}! Welcome back to Nibaron.";

            case 'farmer':
                return "Good {$timeOfDay}, {$user->name}! Welcome back to your farming dashboard.";

            case 'admin':
                return "Good {$timeOfDay}, {$user->name}! Welcome to the admin panel.";

            default:
                return "Good {$timeOfDay}, {$user->name}! Welcome back to Nibaron.";
        }
    }

    private function getTimeOfDay(): string
    {
        $hour = now()->hour;

        if ($hour < 12) {
            return 'morning';
        } elseif ($hour < 17) {
            return 'afternoon';
        } else {
            return 'evening';
        }
    }
}
