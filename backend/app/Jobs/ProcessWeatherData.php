<?php

namespace App\Jobs;

use App\Services\Weather\WeatherApiService;
use App\Models\Weather;
use App\Models\Forecast;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessWeatherData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $latitude;
    protected $longitude;

    public function __construct($latitude, $longitude)
    {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
    }

    public function handle(WeatherApiService $weatherService)
    {
        // Fetch current weather
        $weatherService->getCurrentWeather($this->latitude, $this->longitude);

        // Fetch forecast data
        $forecasts = $weatherService->getForecast($this->latitude, $this->longitude);

        foreach ($forecasts as $forecastData) {
            Forecast::updateOrCreate(
                [
                    'latitude' => $this->latitude,
                    'longitude' => $this->longitude,
                    'forecast_date' => $forecastData['forecast_date']
                ],
                $forecastData
            );
        }
    }
}
