<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Farmer;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    public function run()
    {
        $farmers = Farmer::all();

        $tasks = [
            [
                'title' => 'Apply Fertilizer to Rice Field',
                'description' => 'Apply urea fertilizer to BRRI Dhan28 field. Use 2 bags per acre at tillering stage.',
                'priority' => 'high',
                'status' => 'pending',
                'due_date' => now()->addDays(3),
                'category' => 'fertilization',
            ],
            [
                'title' => 'Harvest Tomatoes',
                'description' => 'Harvest ripe tomatoes from greenhouse. Pick red ones for immediate sale.',
                'priority' => 'urgent',
                'status' => 'in_progress',
                'due_date' => now()->addDays(1),
                'category' => 'harvesting',
            ],
            [
                'title' => 'Prepare Land for Next Season',
                'description' => 'Plow and prepare 2 acres of land for winter vegetable cultivation.',
                'priority' => 'medium',
                'status' => 'completed',
                'due_date' => now()->subDays(2),
                'completed_at' => now()->subDays(1),
                'category' => 'land_preparation',
            ],
            [
                'title' => 'Spray Organic Pesticide',
                'description' => 'Apply neem-based organic pesticide to protect crops from pest attack.',
                'priority' => 'high',
                'status' => 'pending',
                'due_date' => now()->addDays(5),
                'category' => 'pest_control',
            ],
            [
                'title' => 'Check Irrigation System',
                'description' => 'Inspect drip irrigation pipes and repair any leaks. Ensure proper water flow.',
                'priority' => 'medium',
                'status' => 'pending',
                'due_date' => now()->addWeek(),
                'category' => 'maintenance',
            ],
        ];

        foreach ($farmers as $index => $farmer) {
            if (isset($tasks[$index])) {
                Task::create(array_merge($tasks[$index], [
                    'farmer_id' => $farmer->id,
                ]));
            }
        }
    }
}
