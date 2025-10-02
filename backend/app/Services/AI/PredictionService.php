<?php

namespace App\Services\AI;

use App\Models\Crop;
use App\Models\Weather;
use App\Models\Prediction;
use Illuminate\Support\Facades\Http;

class PredictionService
{
    public function generateCropYieldPrediction($cropId)
    {
        $crop = Crop::with(['farm'])->find($cropId);

        if (!$crop) {
            return null;
        }

        // Get historical weather data
        $weatherData = Weather::where('latitude', $crop->farm->latitude)
                             ->where('longitude', $crop->farm->longitude)
                             ->orderBy('recorded_at', 'desc')
                             ->limit(30)
                             ->get();

        // Simplified prediction logic (in real implementation, this would use ML models)
        $avgTemperature = $weatherData->avg('temperature');
        $totalRainfall = $weatherData->sum('rainfall');

        $yieldPrediction = $this->calculateYieldPrediction($crop, $avgTemperature, $totalRainfall);

        return Prediction::create([
            'crop_id' => $cropId,
            'type' => 'yield',
            'prediction_data' => [
                'estimated_yield' => $yieldPrediction,
                'confidence_score' => 0.75,
                'factors' => [
                    'weather_score' => $this->getWeatherScore($avgTemperature, $totalRainfall),
                    'crop_health' => 'good'
                ]
            ],
            'created_at' => now()
        ]);
    }

    public function generateMarketPricePrediction($productName)
    {
        // Simplified market price prediction
        $historicalPrices = $this->getHistoricalPrices($productName);
        $predictedPrice = $this->calculatePriceTrend($historicalPrices);

        return [
            'product' => $productName,
            'predicted_price' => $predictedPrice,
            'trend' => $predictedPrice > end($historicalPrices) ? 'increasing' : 'decreasing',
            'confidence' => 0.68
        ];
    }

    private function calculateYieldPrediction($crop, $temperature, $rainfall)
    {
        // Simplified yield calculation based on crop type and weather conditions
        $baseYield = $crop->area_planted * 2000; // kg per hectare baseline

        $temperatureFactor = $this->getTemperatureFactor($temperature, $crop->name);
        $rainfallFactor = $this->getRainfallFactor($rainfall, $crop->name);

        return $baseYield * $temperatureFactor * $rainfallFactor;
    }

    private function getTemperatureFactor($temperature, $cropType)
    {
        // Optimal temperature ranges for different crops
        $optimalRanges = [
            'rice' => [20, 35],
            'wheat' => [15, 25],
            'corn' => [18, 32],
            'default' => [20, 30]
        ];

        $range = $optimalRanges[strtolower($cropType)] ?? $optimalRanges['default'];

        if ($temperature >= $range[0] && $temperature <= $range[1]) {
            return 1.0;
        } elseif ($temperature < $range[0]) {
            return 0.7 + (0.3 * ($temperature / $range[0]));
        } else {
            return 1.0 - (0.3 * (($temperature - $range[1]) / $range[1]));
        }
    }

    private function getRainfallFactor($rainfall, $cropType)
    {
        // Optimal rainfall amounts for different crops (mm per month)
        $optimalRainfall = [
            'rice' => 150,
            'wheat' => 100,
            'corn' => 120,
            'default' => 100
        ];

        $optimal = $optimalRainfall[strtolower($cropType)] ?? $optimalRainfall['default'];

        if ($rainfall >= $optimal * 0.8 && $rainfall <= $optimal * 1.2) {
            return 1.0;
        } else {
            return 0.6 + (0.4 * min(1, $rainfall / $optimal));
        }
    }

    private function getWeatherScore($temperature, $rainfall)
    {
        return min(100, ($temperature / 30) * 50 + ($rainfall / 150) * 50);
    }

    private function getHistoricalPrices($product)
    {
        // Mock historical prices - in real implementation, fetch from database
        return [45, 48, 52, 49, 51, 53, 50];
    }

    private function calculatePriceTrend($prices)
    {
        $trend = 0;
        for ($i = 1; $i < count($prices); $i++) {
            $trend += $prices[$i] - $prices[$i-1];
        }

        $avgTrend = $trend / (count($prices) - 1);
        return end($prices) + $avgTrend;
    }
}
