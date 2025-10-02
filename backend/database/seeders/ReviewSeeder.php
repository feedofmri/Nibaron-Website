<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\Product;
use App\Models\Buyer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    public function run()
    {
        try {
            DB::beginTransaction();

            $products = Product::with('farmer')->get();
            $buyers = Buyer::with('user')->get();

            if ($products->isEmpty()) {
                $this->command->warn('⚠️ No products found. Please run ProductSeeder first.');
                return;
            }

            if ($buyers->isEmpty()) {
                $this->command->warn('⚠️ No buyers found. Please run UserSeeder first.');
                return;
            }

            $reviews = [
                [
                    'product_name' => 'BRRI Dhan28 Rice',
                    'buyer_type' => 'wholesaler',
                    'rating' => 5,
                    'comment' => 'Excellent quality rice! Perfect for wholesale distribution. Consistent quality and good packaging. Our customers love it.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Fresh Tomatoes',
                    'buyer_type' => 'retailer',
                    'rating' => 4,
                    'comment' => 'Good quality tomatoes, delivered fresh. Perfect for retail sales. Packaging could be improved for better shelf life.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Organic Basmati Rice',
                    'buyer_type' => 'exporter',
                    'rating' => 5,
                    'comment' => 'Premium quality organic basmati rice! Export grade quality with proper certification. International buyers are very satisfied.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Organic Potatoes',
                    'buyer_type' => 'retailer',
                    'rating' => 5,
                    'comment' => 'Amazing organic potatoes! Very fresh and clean. Customers prefer these over regular potatoes. Highly recommended.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Fresh Onions',
                    'buyer_type' => 'wholesaler',
                    'rating' => 4,
                    'comment' => 'Good quality onions with strong flavor. Bulk packaging is efficient for wholesale operations. Competitive pricing.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Ripe Mangoes',
                    'buyer_type' => 'exporter',
                    'rating' => 5,
                    'comment' => 'Exceptional quality Langra mangoes! Perfect ripeness and sweetness. Export quality with excellent shelf life.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Fresh Bananas',
                    'buyer_type' => 'retailer',
                    'rating' => 4,
                    'comment' => 'Fresh Sabri bananas with good quality. Customers like the natural ripening. Delivery timing needs improvement.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Red Lentils (Masur Dal)',
                    'buyer_type' => 'wholesaler',
                    'rating' => 5,
                    'comment' => 'High-quality lentils with consistent size and color. Perfect for bulk distribution. Great value for money.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Organic Chickpeas',
                    'buyer_type' => 'exporter',
                    'rating' => 5,
                    'comment' => 'Premium organic chickpeas with proper certification. International quality standards met. Excellent for export market.',
                    'verified_purchase' => true,
                ],
                [
                    'product_name' => 'Fresh Chili Peppers',
                    'buyer_type' => 'retailer',
                    'rating' => 4,
                    'comment' => 'Good quality green chilies with proper heat level. Fresh and vibrant color. Popular among customers.',
                    'verified_purchase' => true,
                ]
            ];

            $createdReviews = 0;

            foreach ($reviews as $reviewData) {
                // Find product
                $product = $products->firstWhere('name', $reviewData['product_name']);
                if (!$product) {
                    $this->command->warn("⚠️ Product '{$reviewData['product_name']}' not found for review");
                    continue;
                }

                // Find buyer by type (get a random buyer of the specified type)
                $buyersByType = $buyers->where('buyer_type', $reviewData['buyer_type']);
                if ($buyersByType->isEmpty()) {
                    $this->command->warn("⚠️ No {$reviewData['buyer_type']} buyers found for review");
                    continue;
                }

                $buyer = $buyersByType->random();

                // Create review
                Review::create([
                    'buyer_id' => $buyer->id,
                    'product_id' => $product->id,
                    'rating' => $reviewData['rating'],
                    'comment' => $reviewData['comment'],
                    'verified_purchase' => $reviewData['verified_purchase'],
                    'helpful_count' => rand(0, 15),
                ]);

                $createdReviews++;
            }

            DB::commit();

            $this->command->info('✅ ReviewSeeder completed successfully!');
            $this->command->info("📊 Created: {$createdReviews} reviews from different buyer types");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('❌ ReviewSeeder failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
