<?php

namespace Database\Seeders;

use App\Models\PreOrder;
use App\Models\User;
use App\Models\Farmer;
use Illuminate\Database\Seeder;

class PreOrderSeeder extends Seeder
{
    public function run()
    {
        $buyers = User::where('user_type', 'buyer')->get();
        $farmers = Farmer::all();

        $preOrders = [
            [
                'product_name' => 'BRRI Dhan29 Rice',
                'quantity_needed' => 500.0,
                'expected_price' => 58.00,
                'harvest_season' => 'Aman 2025',
                'delivery_date' => now()->addMonths(3),
                'status' => 'pending',
                'notes' => 'Need premium quality rice for export. Advance payment available.',
            ],
            [
                'product_name' => 'Organic Tomatoes',
                'quantity_needed' => 200.0,
                'expected_price' => 70.00,
                'harvest_season' => 'Winter 2025',
                'delivery_date' => now()->addMonths(2),
                'status' => 'confirmed',
                'notes' => 'Required for restaurant chain. Regular weekly supply needed.',
            ],
            [
                'product_name' => 'Langra Mango',
                'quantity_needed' => 1000.0,
                'expected_price' => 180.00,
                'harvest_season' => 'Summer 2025',
                'delivery_date' => now()->addMonths(6),
                'status' => 'pending',
                'notes' => 'Bulk order for wholesale market. Quality must be export grade.',
            ],
            [
                'product_name' => 'Organic Red Lentils',
                'quantity_needed' => 300.0,
                'expected_price' => 90.00,
                'harvest_season' => 'Rabi 2025',
                'delivery_date' => now()->addMonths(4),
                'status' => 'negotiating',
                'notes' => 'For organic food processing company. Certification required.',
            ],
        ];

        foreach ($preOrders as $index => $preOrderData) {
            if ($buyers->count() > $index && $farmers->count() > $index) {
                PreOrder::create(array_merge($preOrderData, [
                    'user_id' => $buyers[$index]->id,
                    'farmer_id' => $farmers[$index]->id,
                ]));
            }
        }
    }
}
