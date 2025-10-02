<?php

namespace Database\Seeders;

use App\Models\Weather;
use Illuminate\Database\Seeder;

class WeatherSeeder extends Seeder
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
            // Create weather data for the last 7 days
            for ($i = 7; $i >= 0; $i--) {
                Weather::create([
                    'location' => $location['name'],
                    'latitude' => $location['lat'],
                    'longitude' => $location['lng'],
                    'temperature' => rand(22, 35) + (rand(0, 9) / 10),
                    'humidity' => rand(60, 85),
                    'rainfall' => rand(0, 15) + (rand(0, 9) / 10),
                    'wind_speed' => rand(5, 20) + (rand(0, 9) / 10),
                    'pressure' => rand(1010, 1025) + (rand(0, 9) / 10),
                    'uv_index' => rand(3, 8) + (rand(0, 9) / 10),
                    'recorded_at' => now()->subDays($i),
                ]);
            }
        }
    }
}
