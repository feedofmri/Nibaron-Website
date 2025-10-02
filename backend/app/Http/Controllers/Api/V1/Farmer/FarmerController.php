<?php

namespace App\Http\Controllers\Api\V1\Farmer;

use App\Http\Controllers\Controller;
use App\Models\Farmer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FarmerController extends Controller
{
    public function index(): JsonResponse
    {
        $farmers = Farmer::with(['user', 'farms'])->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $farmers
        ]);
    }

    public function show($id): JsonResponse
    {
        $farmer = Farmer::with(['user', 'farms', 'products'])->find($id);

        if (!$farmer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Farmer not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $farmer
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $farmer = Farmer::find($id);

        if (!$farmer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Farmer not found'
            ], 404);
        }

        $farmer->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Farmer updated successfully',
            'data' => $farmer
        ]);
    }
}
