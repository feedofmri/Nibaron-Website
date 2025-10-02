<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Buyer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    public function run()
    {
        try {
            DB::beginTransaction();

            // Create admin user only if it doesn't exist
            User::firstOrCreate(
                ['email' => 'admin@nibaron.com'],
                [
                    'name' => 'System Administrator',
                    'password' => Hash::make('Admin@123'),
                    'user_type' => 'admin',
                    'email_verified_at' => now(),
                ]
            );

            // Create real buyer accounts with proper business information
            $buyers = [
                [
                    'user_data' => [
                        'name' => 'Mohammad Karim Ahmed',
                        'email' => 'karim@dhakatrading.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'wholesaler',
                        'business_name' => 'Dhaka Trading Corporation',
                        'phone' => '01711234567',
                        'address' => 'Shop 45-48, Kawran Bazar Wholesale Market, Tejgaon, Dhaka-1215',
                        'district' => 'Dhaka',
                        'registration_number' => 'DHK-2019-WS-001',
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Fatema Rahman',
                        'email' => 'fatema@greenvalleyexports.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'exporter',
                        'business_name' => 'Green Valley Exports Ltd.',
                        'phone' => '01812345678',
                        'address' => 'House 12, Road 5, Dhanmondi R/A, Dhaka-1205',
                        'district' => 'Dhaka',
                        'registration_number' => 'EXP-2020-GV-045',
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Abdul Matin',
                        'email' => 'matin@matinbrothers.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'retailer',
                        'business_name' => 'Matin Brothers Fresh Mart',
                        'phone' => '01913456789',
                        'address' => 'Holding 234, Shahjadpur Bazar, Gulshan-2, Dhaka-1212',
                        'district' => 'Dhaka',
                        'registration_number' => 'RTL-2021-MB-123',
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Rashida Khatun',
                        'email' => 'rashida@chittagongwholesale.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'wholesaler',
                        'business_name' => 'Chittagong Agricultural Wholesale',
                        'phone' => '01714567890',
                        'address' => 'Plot 15-20, Khatunganj Commercial Area, Chittagong-4000',
                        'district' => 'Chittagong',
                        'registration_number' => 'CTG-2020-AW-078',
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Nasir Ahmed',
                        'email' => 'nasir@bangladeshexports.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'exporter',
                        'business_name' => 'Bangladesh Agro Exports International',
                        'phone' => '01815678901',
                        'address' => 'Level 8, City Center, 90/1 Motijheel C/A, Dhaka-1000',
                        'district' => 'Dhaka',
                        'registration_number' => 'EXP-2019-BAE-234',
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Shahida Begum',
                        'email' => 'shahida@sylhetorganics.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'retailer',
                        'business_name' => 'Sylhet Organic Foods',
                        'phone' => '01916789012',
                        'address' => 'Shop 12-15, Zindabazar Shopping Complex, Sylhet-3100',
                        'district' => 'Sylhet',
                        'registration_number' => 'SYL-2021-OF-156',
                        'verification_status' => false,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Mizanur Rahman',
                        'email' => 'mizan@rajshahitraders.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'wholesaler',
                        'business_name' => 'Rajshahi Agricultural Traders',
                        'phone' => '01717890123',
                        'address' => 'Warehouse 5-8, Shaheb Bazar Road, Rajshahi-6000',
                        'district' => 'Rajshahi',
                        'registration_number' => 'RAJ-2020-AT-089',
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Taslima Akter',
                        'email' => 'taslima@khulnaseafood.com',
                        'password' => Hash::make('Buyer@123'),
                        'user_type' => 'buyer',
                        'email_verified_at' => now(),
                    ],
                    'buyer_data' => [
                        'buyer_type' => 'exporter',
                        'business_name' => 'Khulna Seafood & Agriculture Export',
                        'phone' => '01818901234',
                        'address' => 'Rupsha Industrial Area, Plot 45-50, Khulna-9100',
                        'district' => 'Khulna',
                        'registration_number' => 'KHU-2021-SAE-267',
                        'verification_status' => false,
                    ]
                ]
            ];

            foreach ($buyers as $buyerInfo) {
                // Create or find user
                $user = User::firstOrCreate(
                    ['email' => $buyerInfo['user_data']['email']],
                    $buyerInfo['user_data']
                );

                // Create buyer profile if it doesn't exist
                Buyer::firstOrCreate(
                    ['user_id' => $user->id],
                    array_merge($buyerInfo['buyer_data'], ['user_id' => $user->id])
                );
            }

            DB::commit();

            $this->command->info('✅ UserSeeder completed successfully with real buyer data!');
            $this->command->info('📊 Created: 1 admin, ' . count($buyers) . " buyers with complete business profiles");

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('❌ UserSeeder failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
