<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function user(Request $request): JsonResponse
    {
        $user = $request->user();

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

        // Prepare response data
        $responseData = [
            'user' => $user,
            'user_type' => $user->user_type
        ];

        // Add buyer-specific profile data
        if ($user->user_type === 'buyer' && $user->buyer) {
            $responseData['buyer_profile'] = [
                'id' => $user->buyer->id,
                'buyer_type' => $user->buyer->buyer_type,
                'business_name' => $user->buyer->business_name,
                'phone' => $user->buyer->phone,
                'address' => $user->buyer->address,
                'district' => $user->buyer->district,
                'registration_number' => $user->buyer->registration_number,
                'verification_status' => $user->buyer->verification_status,
                'profile_image' => $user->buyer->profile_image,
                'created_at' => $user->buyer->created_at
            ];
        }

        // Add farmer-specific profile data
        if ($user->user_type === 'farmer' && $user->farmer) {
            $responseData['farmer_profile'] = [
                'id' => $user->farmer->id,
                'nid' => $user->farmer->nid,
                'phone' => $user->farmer->phone,
                'address' => $user->farmer->address,
                'district' => $user->farmer->district,
                'upazila' => $user->farmer->upazila,
                'union' => $user->farmer->union,
                'village' => $user->farmer->village,
                'farming_experience' => $user->farmer->farming_experience,
                'total_land' => $user->farmer->total_land,
                'verification_status' => $user->farmer->verification_status,
                'profile_image' => $user->farmer->profile_image,
                'farms_count' => $user->farmer->farms->count(),
                'created_at' => $user->farmer->created_at
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $responseData
        ]);
    }

    public function refresh(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Token refreshed successfully'
        ]);
    }
}
