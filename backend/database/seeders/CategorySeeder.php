<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'Rice & Grains',
                'description' => 'Rice, wheat, and other grain products',
                'status' => true,
            ],
            [
                'name' => 'Vegetables',
                'description' => 'Fresh vegetables and leafy greens',
                'status' => true,
            ],
            [
                'name' => 'Fruits',
                'description' => 'Seasonal and tropical fruits',
                'status' => true,
            ],
            [
                'name' => 'Pulses & Legumes',
                'description' => 'Lentils, beans, and other legumes',
                'status' => true,
            ],
            [
                'name' => 'Spices & Herbs',
                'description' => 'Fresh and dried spices, herbs',
                'status' => true,
            ],
            [
                'name' => 'Fish',
                'description' => 'Fresh water fish and aquaculture products',
                'status' => true,
            ],
            [
                'name' => 'Dairy Products',
                'description' => 'Milk, yogurt, and dairy items',
                'status' => true,
            ],
            [
                'name' => 'Organic Products',
                'description' => 'Certified organic agricultural products',
                'status' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category['name']],
                $category
            );
        }
    }
}
