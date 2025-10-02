<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncFarmerData extends Command
{
    protected $signature = 'farmer:sync';
    protected $description = 'Sync farmer data from external sources';

    public function handle()
    {
        $this->info('Syncing farmer data...');
        // Implementation logic here
        $this->info('Farmer data sync completed.');
    }
}
