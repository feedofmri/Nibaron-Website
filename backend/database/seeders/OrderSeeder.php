<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Buyer;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderSeeder extends Seeder
{
    public function run()
    {
        try {
            DB::beginTransaction();

            $buyers = Buyer::with('user')->get();
            $products = Product::with('farmer')->get();

            if ($buyers->isEmpty()) {
                $this->command->warn('⚠️ No buyers found. Please run UserSeeder first.');
                return;
            }

            if ($products->isEmpty()) {
                $this->command->warn('⚠️ No products found. Please run ProductSeeder first.');
                return;
            }

            $orders = [
                [
                    'order_number' => 'NBN-ORD-001-2025',
                    'status' => 'delivered',
                    'shipping_address' => 'Shop 45-48, Kawran Bazar Wholesale Market, Tejgaon, Dhaka-1215',
                    'payment_method' => 'bkash',
                    'payment_status' => 'paid',
                    'notes' => 'Bulk order for wholesale distribution - Handle with care',
                    'delivered_at' => now()->subDays(5),
                    'buyer_type' => 'wholesaler',
                    'items' => [
                        ['product_name' => 'BRRI Dhan28 Rice', 'quantity' => 100.0],
                        ['product_name' => 'Fresh Onions', 'quantity' => 50.0],
                    ]
                ],
                [
                    'order_number' => 'NBN-ORD-002-2025',
                    'status' => 'shipped',
                    'shipping_address' => 'Level 8, City Center, 90/1 Motijheel C/A, Dhaka-1000',
                    'payment_method' => 'bank_transfer',
                    'payment_status' => 'paid',
                    'notes' => 'Export quality products required - Certificate needed',
                    'delivered_at' => null,
                    'buyer_type' => 'exporter',
                    'items' => [
                        ['product_name' => 'Organic Basmati Rice', 'quantity' => 200.0],
                        ['product_name' => 'Organic Chickpeas', 'quantity' => 100.0],
                    ]
                ],
                [
                    'order_number' => 'NBN-ORD-003-2025',
                    'status' => 'confirmed',
                    'shipping_address' => 'Holding 234, Shahjadpur Bazar, Gulshan-2, Dhaka-1212',
                    'payment_method' => 'cash_on_delivery',
                    'payment_status' => 'pending',
                    'notes' => 'Fresh products for retail store - Daily delivery preferred',
                    'delivered_at' => null,
                    'buyer_type' => 'retailer',
                    'items' => [
                        ['product_name' => 'Fresh Tomatoes', 'quantity' => 25.0],
                        ['product_name' => 'Fresh Bananas', 'quantity' => 15.0],
                        ['product_name' => 'Fresh Chili Peppers', 'quantity' => 5.0],
                    ]
                ],
                [
                    'order_number' => 'NBN-ORD-004-2025',
                    'status' => 'processing',
                    'shipping_address' => 'Plot 15-20, Khatunganj Commercial Area, Chittagong-4000',
                    'payment_method' => 'nagad',
                    'payment_status' => 'paid',
                    'notes' => 'Weekly bulk order for regional distribution',
                    'delivered_at' => null,
                    'buyer_type' => 'wholesaler',
                    'items' => [
                        ['product_name' => 'Organic Potatoes', 'quantity' => 150.0],
                        ['product_name' => 'Red Lentils (Masur Dal)', 'quantity' => 80.0],
                    ]
                ],
                [
                    'order_number' => 'NBN-ORD-005-2025',
                    'status' => 'pending',
                    'shipping_address' => 'Rupsha Industrial Area, Plot 45-50, Khulna-9100',
                    'payment_method' => 'bank_transfer',
                    'payment_status' => 'pending',
                    'notes' => 'Export shipment - Quality inspection required',
                    'delivered_at' => null,
                    'buyer_type' => 'exporter',
                    'items' => [
                        ['product_name' => 'Ripe Mangoes', 'quantity' => 50.0],
                        ['product_name' => 'Fresh Chili Peppers', 'quantity' => 20.0],
                    ]
                ],
                [
                    'order_number' => 'NBN-ORD-006-2025',
                    'status' => 'delivered',
                    'shipping_address' => 'Shop 12-15, Zindabazar Shopping Complex, Sylhet-3100',
                    'payment_method' => 'rocket',
                    'payment_status' => 'paid',
                    'notes' => 'Organic products for premium retail outlet',
                    'delivered_at' => now()->subDays(2),
                    'buyer_type' => 'retailer',
                    'items' => [
                        ['product_name' => 'Organic Basmati Rice', 'quantity' => 30.0],
                        ['product_name' => 'Organic Potatoes', 'quantity' => 40.0],
                    ]
                ]
            ];

            $createdOrders = 0;

            foreach ($orders as $orderData) {
                // Find buyer by type (rotate through buyers of the specified type)
                $buyersByType = $buyers->where('buyer_type', $orderData['buyer_type']);
                if ($buyersByType->isEmpty()) {
                    $this->command->warn("⚠️ No {$orderData['buyer_type']} buyers found for order {$orderData['order_number']}");
                    continue;
                }

                $buyer = $buyersByType->random();

                // Calculate total amount
                $totalAmount = 0;
                $orderItems = [];

                foreach ($orderData['items'] as $itemData) {
                    $product = $products->firstWhere('name', $itemData['product_name']);
                    if (!$product) {
                        $this->command->warn("⚠️ Product '{$itemData['product_name']}' not found for order {$orderData['order_number']}");
                        continue;
                    }

                    $itemTotal = $product->price_per_unit * $itemData['quantity'];
                    $totalAmount += $itemTotal;

                    $orderItems[] = [
                        'product' => $product,
                        'quantity' => $itemData['quantity'],
                        'unit_price' => $product->price_per_unit,
                        'total_price' => $itemTotal
                    ];
                }

                if (empty($orderItems)) {
                    continue;
                }

                // Create order
                $order = Order::create([
                    'buyer_id' => $buyer->id,
                    'order_number' => $orderData['order_number'],
                    'status' => $orderData['status'],
                    'total_amount' => $totalAmount,
                    'shipping_address' => $orderData['shipping_address'],
                    'payment_method' => $orderData['payment_method'],
                    'payment_status' => $orderData['payment_status'],
                    'notes' => $orderData['notes'],
                    'delivered_at' => $orderData['delivered_at'],
                ]);

                // Create order items
                foreach ($orderItems as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product']->id,
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'total_price' => $item['total_price'],
                    ]);
                }

                $createdOrders++;
            }

            DB::commit();

            $this->command->info('✅ OrderSeeder completed successfully!');
            $this->command->info("📊 Created: {$createdOrders} orders across different buyer types");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('❌ OrderSeeder failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
