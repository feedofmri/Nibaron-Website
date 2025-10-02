<?php

namespace App\Events;

use App\Models\HazardAlert;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WeatherAlertIssued
{
    use Dispatchable, SerializesModels;

    public $hazardAlert;

    public function __construct(HazardAlert $hazardAlert)
    {
        $this->hazardAlert = $hazardAlert;
    }
}
