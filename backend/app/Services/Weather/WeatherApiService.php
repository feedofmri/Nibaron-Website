<?php

namespace App\Services\Weather;

use App\Models\Weather;
use App\Models\Forecast;
use Illuminate\Support\Facades\Http;

class WeatherApiService
{
    protected $apiKey;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = config('services.weather.api_key');
        $this->baseUrl = config('services.weather.base_url', 'https://api.openweathermap.org/data/2.5');
    }

    public function getCurrentWeather($latitude, $longitude)
    {
        $response = Http::get($this->baseUrl . '/weather', [
            'lat' => $latitude,
            'lon' => $longitude,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        if ($response->successful()) {
            $data = $response->json();

            return Weather::create([
                'location' => $data['name'],
                'latitude' => $latitude,
                'longitude' => $longitude,
                'temperature' => $data['main']['temp'],
                'humidity' => $data['main']['humidity'],
                'rainfall' => $data['rain']['1h'] ?? 0,
                'wind_speed' => $data['wind']['speed'],
                'pressure' => $data['main']['pressure'],
                'uv_index' => 0, // Requires separate API call
                'recorded_at' => now()
            ]);
        }

        return null;
    }

    public function getForecast($latitude, $longitude, $days = 5)
    {
        $response = Http::get($this->baseUrl . '/forecast', [
            'lat' => $latitude,
            'lon' => $longitude,
            'appid' => $this->apiKey,
            'units' => 'metric'
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $forecasts = [];

            foreach (array_slice($data['list'], 0, $days * 8) as $item) { // 8 forecasts per day (3-hour intervals)
                $forecasts[] = [
                    'location' => $data['city']['name'],
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'forecast_date' => date('Y-m-d', $item['dt']),
                    'temperature_min' => $item['main']['temp_min'],
                    'temperature_max' => $item['main']['temp_max'],
                    'humidity' => $item['main']['humidity'],
                    'rainfall_probability' => $item['pop'] * 100,
                    'wind_speed' => $item['wind']['speed'],
                    'conditions' => $item['weather'][0]['description']
                ];
            }

            return $forecasts;
        }

        return [];
    }
}
