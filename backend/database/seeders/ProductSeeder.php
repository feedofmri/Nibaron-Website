<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Farmer;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        try {
            DB::beginTransaction();

            $farmers = Farmer::with('user')->get();
            $categories = Category::all();

            if ($farmers->isEmpty()) {
                $this->command->warn('⚠️ No farmers found. Please run FarmerSeeder first.');
                return;
            }

            if ($categories->isEmpty()) {
                $this->command->warn('⚠️ No categories found. Please run CategorySeeder first.');
                return;
            }

            $products = [
                // Rice & Grains
                [
                    'category_name' => 'Rice & Grains',
                    'name' => 'BRRI Dhan28 Rice',
                    'description' => 'Premium quality Boro rice, high yield variety suitable for all seasons',
                    'price_per_unit' => 55.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 500.00,
                    'harvest_date' => now()->subDays(15),
                    'expiry_date' => now()->addMonths(12),
                    'quality_grade' => 'Premium',
                    'organic_certified' => false,
                    'status' => 'available',
                ],
                [
                    'category_name' => 'Rice & Grains',
                    'name' => 'Organic Basmati Rice',
                    'description' => 'Aromatic organic basmati rice, pesticide-free cultivation',
                    'price_per_unit' => 120.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 200.00,
                    'harvest_date' => now()->subDays(20),
                    'expiry_date' => now()->addMonths(18),
                    'quality_grade' => 'Premium',
                    'organic_certified' => true,
                    'status' => 'available',
                ],
                // Vegetables
                [
                    'category_name' => 'Vegetables',
                    'name' => 'Fresh Tomatoes',
                    'description' => 'Farm-fresh red tomatoes, perfect for cooking and salads',
                    'price_per_unit' => 80.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 150.00,
                    'harvest_date' => now()->subDays(5),
                    'expiry_date' => now()->addDays(7),
                    'quality_grade' => 'Grade A',
                    'organic_certified' => false,
                    'status' => 'available',
                ],
                [
                    'category_name' => 'Vegetables',
                    'name' => 'Organic Potatoes',
                    'description' => 'Chemical-free potatoes, ideal for healthy cooking',
                    'price_per_unit' => 45.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 300.00,
                    'harvest_date' => now()->subDays(30),
                    'expiry_date' => now()->addMonths(3),
                    'quality_grade' => 'Premium',
                    'organic_certified' => true,
                    'status' => 'available',
                ],
                [
                    'category_name' => 'Vegetables',
                    'name' => 'Fresh Onions',
                    'description' => 'Red onions with strong flavor, perfect for cooking',
                    'price_per_unit' => 60.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 400.00,
                    'harvest_date' => now()->subDays(45),
                    'expiry_date' => now()->addMonths(6),
                    'quality_grade' => 'Grade A',
                    'organic_certified' => false,
                    'status' => 'available',
                ],
                // Fruits
                [
                    'category_name' => 'Fruits',
                    'name' => 'Ripe Mangoes',
                    'description' => 'Sweet and juicy Langra mangoes from Rajshahi',
                    'price_per_unit' => 150.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 100.00,
                    'harvest_date' => now()->subDays(2),
                    'expiry_date' => now()->addDays(5),
                    'quality_grade' => 'Premium',
                    'organic_certified' => false,
                    'status' => 'available',
                ],
                [
                    'category_name' => 'Fruits',
                    'name' => 'Fresh Bananas',
                    'description' => 'Premium quality Sabri bananas, naturally ripened',
                    'price_per_unit' => 40.00,
                    'unit_type' => 'dozen',
                    'quantity_available' => 80.00,
                    'harvest_date' => now()->subDays(3),
                    'expiry_date' => now()->addDays(4),
                    'quality_grade' => 'Grade A',
                    'organic_certified' => false,
                    'status' => 'available',
                ],
                // Pulses & Legumes
                [
                    'category_name' => 'Pulses & Legumes',
                    'name' => 'Red Lentils (Masur Dal)',
                    'description' => 'High protein red lentils, locally grown',
                    'price_per_unit' => 110.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 250.00,
                    'harvest_date' => now()->subDays(60),
                    'expiry_date' => now()->addMonths(24),
                    'quality_grade' => 'Premium',
                    'organic_certified' => false,
                    'status' => 'available',
                ],
                [
                    'category_name' => 'Pulses & Legumes',
                    'name' => 'Organic Chickpeas',
                    'description' => 'Organic chickpeas, perfect for traditional dishes',
                    'price_per_unit' => 130.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 180.00,
                    'harvest_date' => now()->subDays(90),
                    'expiry_date' => now()->addMonths(24),
                    'quality_grade' => 'Premium',
                    'organic_certified' => true,
                    'status' => 'available',
                ],
                // Spices & Herbs
                [
                    'category_name' => 'Spices & Herbs',
                    'name' => 'Fresh Chili Peppers',
                    'description' => 'Hot green chilies, freshly harvested',
                    'price_per_unit' => 200.00,
                    'unit_type' => 'kg',
                    'quantity_available' => 50.00,
                    'harvest_date' => now()->subDays(3),
                    'expiry_date' => now()->addDays(10),
                    'quality_grade' => 'Grade A',
                    'organic_certified' => false,
                    'status' => 'available',
                ]
            ];

            $createdProducts = 0;

            foreach ($products as $index => $productData) {
                // Find category
                $category = $categories->firstWhere('name', $productData['category_name']);
                if (!$category) {
                    $this->command->warn("⚠️ Category '{$productData['category_name']}' not found for product '{$productData['name']}'");
                    continue;
                }

                // Assign farmer (rotate through available farmers)
                $farmer = $farmers[$index % $farmers->count()];

                // Create product
                Product::create([
                    'farmer_id' => $farmer->id,
                    'category_id' => $category->id,
                    'name' => $productData['name'],
                    'description' => $productData['description'],
                    'price_per_unit' => $productData['price_per_unit'],
                    'unit_type' => $productData['unit_type'],
                    'quantity_available' => $productData['quantity_available'],
                    'harvest_date' => $productData['harvest_date'],
                    'expiry_date' => $productData['expiry_date'],
                    'quality_grade' => $productData['quality_grade'],
                    'organic_certified' => $productData['organic_certified'],
                    'status' => $productData['status'],
                    'images' => json_encode([
                        'products/' . strtolower(str_replace(' ', '_', $productData['name'])) . '.jpg'
                    ]),
                ]);

                $createdProducts++;
            }

            DB::commit();

            $this->command->info('✅ ProductSeeder completed successfully!');
            $this->command->info("📊 Created: {$createdProducts} products from {$farmers->count()} farmers");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('❌ ProductSeeder failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
