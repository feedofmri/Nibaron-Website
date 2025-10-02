<?php

namespace App\Jobs;

use App\Services\AI\PredictionService;
use App\Models\Farmer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GenerateDailyPredictions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle(PredictionService $predictionService)
    {
        $farmers = Farmer::with(['farms.crops'])->get();

        foreach ($farmers as $farmer) {
            foreach ($farmer->farms as $farm) {
                foreach ($farm->crops as $crop) {
                    // Generate yield predictions for each crop
                    $predictionService->generateCropYieldPrediction($crop->id);
                }
            }
        }
    }
}
