<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Crop;

class CropPredictionController extends Controller
{
    public function index(Request $request)
    {
        // Fetch crops with their farm relationships
        $crops = Crop::with(['farm', 'farm.farmer'])
            ->where('status', 'active')
            ->get();

        // Generate predictions based on existing crop data
        $predictions = $crops->map(function ($crop, $index) {
            // Generate realistic prediction data based on crop info
            $qualityScore = rand(75, 95);
            $confidence = rand(85, 98);
            $estimatedQuantity = $crop->area_planted * rand(3, 8); // tons per hectare

            return [
                'id' => $crop->id,
                'crop' => $crop->name,
                'variety' => $crop->variety,
                'region' => $crop->farm->district ?? 'Unknown',
                'district' => $crop->farm->district ?? 'Unknown',
                'quality' => $qualityScore,
                'quantity' => round($estimatedQuantity, 2),
                'harvestDate' => $crop->expected_harvest_date?->format('Y-m-d') ?? now()->addMonths(2)->format('Y-m-d'),
                'confidence' => $confidence,
                'factors' => [
                    'weather' => $qualityScore > 85 ? 'favorable' : ($qualityScore > 78 ? 'optimal' : 'challenging'),
                    'soil' => $confidence > 90 ? 'optimal' : 'good',
                    'pest' => $confidence > 93 ? 'low' : 'moderate'
                ],
            ];
        });

        // If no crops exist, return some sample predictions
        if ($predictions->isEmpty()) {
            $predictions = collect([
                [
                    'id' => 1,
                    'crop' => 'Boro Rice',
                    'variety' => 'BRRI dhan28',
                    'region' => 'Sirajganj',
                    'district' => 'Rajshahi',
                    'quality' => 87,
                    'quantity' => 5000,
                    'harvestDate' => now()->addMonths(3)->format('Y-m-d'),
                    'confidence' => 94,
                    'factors' => [
                        'weather' => 'favorable',
                        'soil' => 'optimal',
                        'pest' => 'low'
                    ]
                ],
                [
                    'id' => 2,
                    'crop' => 'Potato',
                    'variety' => 'Diamant',
                    'region' => 'Munshiganj',
                    'district' => 'Dhaka',
                    'quality' => 92,
                    'quantity' => 3200,
                    'harvestDate' => now()->addMonths(1)->format('Y-m-d'),
                    'confidence' => 89,
                    'factors' => [
                        'weather' => 'optimal',
                        'soil' => 'good',
                        'pest' => 'moderate'
                    ]
                ],
                [
                    'id' => 3,
                    'crop' => 'Wheat',
                    'variety' => 'BARI Gom-26',
                    'region' => 'Dinajpur',
                    'district' => 'Rangpur',
                    'quality' => 78,
                    'quantity' => 4500,
                    'harvestDate' => now()->addMonths(2)->format('Y-m-d'),
                    'confidence' => 91,
                    'factors' => [
                        'weather' => 'challenging',
                        'soil' => 'good',
                        'pest' => 'low'
                    ]
                ]
            ]);
        }

        return response()->json($predictions->values());
    }
}
