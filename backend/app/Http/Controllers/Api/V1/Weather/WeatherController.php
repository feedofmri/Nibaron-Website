<?php

namespace App\Http\Controllers\Api\V1\Weather;

use App\Http\Controllers\Controller;
use App\Models\Weather;
use App\Models\Forecast;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class WeatherController extends Controller
{
    public function current(Request $request): JsonResponse
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        $weather = Weather::where('latitude', $request->latitude)
                         ->where('longitude', $request->longitude)
                         ->latest()
                         ->first();

        return response()->json([
            'status' => 'success',
            'data' => $weather
        ]);
    }

    public function forecast(Request $request): JsonResponse
    {
        $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'days' => 'integer|min:1|max:7'
        ]);

        $days = $request->input('days', 5);

        $forecasts = Forecast::where('latitude', $request->latitude)
                           ->where('longitude', $request->longitude)
                           ->where('forecast_date', '>=', now())
                           ->orderBy('forecast_date')
                           ->take($days)
                           ->get();

        return response()->json([
            'status' => 'success',
            'data' => $forecasts
        ]);
    }
}
