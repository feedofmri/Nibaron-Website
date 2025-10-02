<?php

namespace Database\Seeders;

use App\Models\Forecast;
use Illuminate\Database\Seeder;

class ForecastSeeder extends Seeder
{
    public function run()
    {
        $locations = [
            ['name' => 'Rajshahi', 'lat' => 24.4539, 'lng' => 88.3182],
            ['name' => 'Rangpur', 'lat' => 25.5647, 'lng' => 89.2734],
            ['name' => 'Narayanganj', 'lat' => 23.6456, 'lng' => 90.6123],
            ['name' => 'Chapai Nawabganj', 'lat' => 24.6892, 'lng' => 88.2845],
        ];

        foreach ($locations as $location) {
            // Create 7-day weather forecast
            for ($i = 1; $i <= 7; $i++) {
                Forecast::create([
                    'location' => $location['name'],
                    'latitude' => $location['lat'],
                    'longitude' => $location['lng'],
                    'forecast_date' => now()->addDays($i),
                    'temperature_min' => rand(18, 25) + (rand(0, 9) / 10),
                    'temperature_max' => rand(28, 38) + (rand(0, 9) / 10),
                    'humidity' => rand(65, 90),
                    'rainfall_probability' => rand(10, 80),
                    'wind_speed' => rand(8, 25) + (rand(0, 9) / 10),
                    'conditions' => $this->getRandomCondition(),
                ]);
            }
        }
    }

    private function getRandomCondition()
    {
        $conditions = [
            'Clear sky',
            'Partly cloudy',
            'Cloudy',
            'Light rain',
            'Moderate rain',
            'Heavy rain',
            'Thunderstorm',
            'Sunny',
            'Overcast'
        ];

        return $conditions[array_rand($conditions)];
    }
}
