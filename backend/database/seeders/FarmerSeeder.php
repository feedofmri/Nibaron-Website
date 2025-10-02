<?php

namespace Database\Seeders;

use App\Models\Farmer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class FarmerSeeder extends Seeder
{
    public function run()
    {
        try {
            DB::beginTransaction();

            // Create farmers with their user accounts (synced from mobile app)
            $farmers = [
                [
                    'user_data' => [
                        'name' => 'Abdul Karim Miah',
                        'email' => 'karim.farmer@nibaron.com',
                        'password' => Hash::make('Farmer@123'),
                        'user_type' => 'farmer',
                        'email_verified_at' => now(),
                    ],
                    'farmer_data' => [
                        'nid' => '1234567890123',
                        'phone' => '01711234567',
                        'address' => 'Village: Rampur, Post: Rampur Bazar',
                        'district' => 'Rajshahi',
                        'upazila' => 'Godagari',
                        'union' => 'Rampur',
                        'village' => 'Rampur',
                        'farming_experience' => 15,
                        'total_land' => 5.5,
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Rashida Begum',
                        'email' => 'rashida.farmer@nibaron.com',
                        'password' => Hash::make('Farmer@123'),
                        'user_type' => 'farmer',
                        'email_verified_at' => now(),
                    ],
                    'farmer_data' => [
                        'nid' => '2345678901234',
                        'phone' => '01812345678',
                        'address' => 'Village: Kashipur, Post: Kashipur',
                        'district' => 'Rangpur',
                        'upazila' => 'Mithapukur',
                        'union' => 'Kashipur',
                        'village' => 'Kashipur',
                        'farming_experience' => 20,
                        'total_land' => 8.2,
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Mohammad Hasan',
                        'email' => 'hasan.farmer@nibaron.com',
                        'password' => Hash::make('Farmer@123'),
                        'user_type' => 'farmer',
                        'email_verified_at' => now(),
                    ],
                    'farmer_data' => [
                        'nid' => '3456789012345',
                        'phone' => '01913456789',
                        'address' => 'Village: Sonargaon, Post: Sonargaon Sadar',
                        'district' => 'Narayanganj',
                        'upazila' => 'Sonargaon',
                        'union' => 'Mograpara',
                        'village' => 'Sonargaon',
                        'farming_experience' => 12,
                        'total_land' => 3.8,
                        'verification_status' => false,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Fatema Khatun',
                        'email' => 'fatema.farmer@nibaron.com',
                        'password' => Hash::make('Farmer@123'),
                        'user_type' => 'farmer',
                        'email_verified_at' => now(),
                    ],
                    'farmer_data' => [
                        'nid' => '4567890123456',
                        'phone' => '01714567890',
                        'address' => 'Village: Bogra Sadar, Post: Bogra',
                        'district' => 'Bogra',
                        'upazila' => 'Bogra Sadar',
                        'union' => 'Bogra',
                        'village' => 'Bogra Sadar',
                        'farming_experience' => 8,
                        'total_land' => 4.2,
                        'verification_status' => true,
                    ]
                ],
                [
                    'user_data' => [
                        'name' => 'Mizanur Rahman',
                        'email' => 'mizan.farmer@nibaron.com',
                        'password' => Hash::make('Farmer@123'),
                        'user_type' => 'farmer',
                        'email_verified_at' => now(),
                    ],
                    'farmer_data' => [
                        'nid' => '5678901234567',
                        'phone' => '01815678901',
                        'address' => 'Village: Sylhet Sadar, Post: Sylhet',
                        'district' => 'Sylhet',
                        'upazila' => 'Sylhet Sadar',
                        'union' => 'Sylhet',
                        'village' => 'Sylhet Sadar',
                        'farming_experience' => 25,
                        'total_land' => 12.3,
                        'verification_status' => true,
                    ]
                ]
            ];

            foreach ($farmers as $farmerInfo) {
                // Create or find user
                $user = User::firstOrCreate(
                    ['email' => $farmerInfo['user_data']['email']],
                    $farmerInfo['user_data']
                );

                // Create farmer profile if it doesn't exist
                Farmer::firstOrCreate(
                    ['user_id' => $user->id],
                    array_merge($farmerInfo['farmer_data'], ['user_id' => $user->id])
                );
            }

            DB::commit();

            $this->command->info('✅ FarmerSeeder completed successfully!');
            $this->command->info('📊 Created: ' . count($farmers) . ' farmers with complete profiles');

        } catch (\Exception $e) {
            DB::rollBack();
            $this->command->error('❌ FarmerSeeder failed: ' . $e->getMessage());
            throw $e;
        }
    }
}
