<?php

namespace Database\Seeders;

use App\Models\Crop;
use App\Models\Farm;
use Illuminate\Database\Seeder;

class CropSeeder extends Seeder
{
    public function run()
    {
        $farms = Farm::all();

        $crops = [
            [
                'name' => 'BRRI Dhan28',
                'variety' => 'Boro Rice',
                'planting_date' => now()->subMonths(4),
                'expected_harvest_date' => now()->addDays(15),
                'area_planted' => 2.5,
                'growth_stage' => 'Harvesting',
                'status' => 'healthy',
            ],
            [
                'name' => 'Tomato',
                'variety' => 'Roma Tomato',
                'planting_date' => now()->subMonths(2),
                'expected_harvest_date' => now()->addDays(30),
                'area_planted' => 1.0,
                'growth_stage' => 'Flowering',
                'status' => 'healthy',
            ],
            [
                'name' => 'Himsagar Mango',
                'variety' => 'Grafted Variety',
                'planting_date' => now()->subYears(3),
                'expected_harvest_date' => now()->addMonths(2),
                'area_planted' => 1.5,
                'growth_stage' => 'Fruit Development',
                'status' => 'healthy',
            ],
            [
                'name' => 'Red Lentils',
                'variety' => 'BARI Masoor-8',
                'planting_date' => now()->subMonths(3),
                'expected_harvest_date' => now()->addDays(45),
                'area_planted' => 1.2,
                'growth_stage' => 'Pod Formation',
                'status' => 'healthy',
            ],
        ];

        foreach ($farms as $index => $farm) {
            if (isset($crops[$index])) {
                Crop::create(array_merge(
                    ['farm_id' => $farm->id],
                    $crops[$index]
                ));
            }
        }
    }
}
