<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use App\Models\Farmer;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $farmers = Farmer::all();

        $notifications = [
            // Welcome notifications
            [
                'type' => 'welcome',
                'title' => 'Welcome to Nibaron',
                'message' => 'Welcome to Bangladesh\'s premier agricultural marketplace. Start exploring fresh products from verified farmers.',
                'data' => ['action' => 'explore_products'],
                'sent_at' => now()->subDays(7),
            ],
            // Order notifications
            [
                'type' => 'order_confirmation',
                'title' => 'Order Confirmed',
                'message' => 'Your order #ORD-001-2025 has been confirmed and will be delivered within 2-3 days.',
                'data' => ['order_id' => 1, 'estimated_delivery' => now()->addDays(3)],
                'sent_at' => now()->subDays(5),
            ],
            // Weather alerts for farmers
            [
                'type' => 'weather_alert',
                'title' => 'Heavy Rainfall Alert',
                'message' => 'Heavy rainfall expected in your area for next 48 hours. Protect your crops and ensure proper drainage.',
                'data' => ['severity' => 'high', 'duration' => '48 hours', 'region' => 'Rajshahi'],
                'sent_at' => now()->subDays(2),
            ],
            // Harvest reminders
            [
                'type' => 'harvest_reminder',
                'title' => 'Harvest Time Approaching',
                'message' => 'Your BRRI Dhan28 crop is ready for harvest. Current market price: ৳55/kg.',
                'data' => ['crop_id' => 1, 'market_price' => 55.00, 'action' => 'list_product'],
                'sent_at' => now()->subDays(1),
            ],
            // Market price updates
            [
                'type' => 'price_update',
                'title' => 'Market Price Alert',
                'message' => 'Rice prices have increased by 8% this week. Good time to sell your harvest.',
                'data' => ['product' => 'Rice', 'price_change' => '+8%', 'current_price' => 58.00],
                'sent_at' => now()->subHours(6),
            ],
        ];

        foreach ($notifications as $index => $notificationData) {
            // Send to appropriate users based on notification type
            $targetUsers = [];

            switch ($notificationData['type']) {
                case 'welcome':
                    $targetUsers = $users->take(3); // Send to first 3 users
                    break;
                case 'order_confirmation':
                    $targetUsers = User::where('user_type', 'buyer')->take(2)->get();
                    break;
                case 'weather_alert':
                case 'harvest_reminder':
                case 'price_update':
                    $targetUsers = User::where('user_type', 'farmer')->take(2)->get();
                    break;
                default:
                    $targetUsers = $users->take(1);
            }

            foreach ($targetUsers as $user) {
                Notification::create(array_merge($notificationData, [
                    'user_id' => $user->id,
                    'read_at' => rand(0, 1) ? now()->subHours(rand(1, 24)) : null, // Some read, some unread
                ]));
            }
        }
    }
}
