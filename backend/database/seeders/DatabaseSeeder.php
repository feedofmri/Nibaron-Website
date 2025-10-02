<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            FarmerSeeder::class,
            CategorySeeder::class,
            FarmSeeder::class,
            CropSeeder::class,
            ProductSeeder::class,
            WeatherSeeder::class,
            ForecastSeeder::class,
            ReviewSeeder::class,
            OrderSeeder::class,
            PreOrderSeeder::class,
            NotificationSeeder::class,
            CommunitySeeder::class,
            TaskSeeder::class,
        ]);
    }
}
