<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendWeatherAlerts extends Command
{
    protected $signature = 'weather:alerts';
    protected $description = 'Send weather alerts to farmers';

    public function handle()
    {
        $this->info('Sending weather alerts...');
        // Implementation logic here
        $this->info('Weather alerts sent successfully.');
    }
}
