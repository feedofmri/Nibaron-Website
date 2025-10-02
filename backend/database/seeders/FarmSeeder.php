<?php

namespace Database\Seeders;

use App\Models\Farm;
use App\Models\Farmer;
use Illuminate\Database\Seeder;

class FarmSeeder extends Seeder
{
    public function run()
    {
        $farmers = Farmer::all();

        $farmData = [
            [
                'name' => 'Green Valley Farm',
                'location' => 'Rampur, Godagari, Rajshahi',
                'latitude' => 24.4539,
                'longitude' => 88.3182,
                'size_acres' => 3.5,
                'soil_type' => 'Clay Loam',
                'water_source' => 'Tube Well',
                'irrigation_type' => 'Drip Irrigation',
                'description' => 'Organic rice and vegetable farm with modern irrigation system',
            ],
            [
                'name' => 'Sunrise Agriculture',
                'location' => 'Kashipur, Mithapukur, Rangpur',
                'latitude' => 25.5647,
                'longitude' => 89.2734,
                'size_acres' => 6.2,
                'soil_type' => 'Sandy Loam',
                'water_source' => 'River',
                'irrigation_type' => 'Canal Irrigation',
                'description' => 'Traditional rice farming with seasonal vegetables',
            ],
            [
                'name' => 'Golden Harvest',
                'location' => 'Sonargaon, Narayanganj',
                'latitude' => 23.6456,
                'longitude' => 90.6123,
                'size_acres' => 2.8,
                'soil_type' => 'Alluvial Soil',
                'water_source' => 'Pond',
                'irrigation_type' => 'Surface Irrigation',
                'description' => 'Mixed farming with rice, fish, and vegetables',
            ],
            [
                'name' => 'Riverside Farm',
                'location' => 'Shibganj, Chapai Nawabganj',
                'latitude' => 24.6892,
                'longitude' => 88.2845,
                'size_acres' => 4.7,
                'soil_type' => 'Fertile Alluvial',
                'water_source' => 'River',
                'irrigation_type' => 'Sprinkler System',
                'description' => 'Mango orchard and seasonal crop cultivation',
            ],
        ];

        foreach ($farmers as $index => $farmer) {
            if (isset($farmData[$index])) {
                Farm::firstOrCreate(
                    [
                        'farmer_id' => $farmer->id,
                        'name' => $farmData[$index]['name']
                    ],
                    array_merge(['farmer_id' => $farmer->id], $farmData[$index])
                );
            }
        }
    }
}
