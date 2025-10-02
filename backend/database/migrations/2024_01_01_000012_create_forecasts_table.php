<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forecasts', function (Blueprint $table) {
            $table->id();
            $table->string('location');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->date('forecast_date');
            $table->decimal('temperature_min', 5, 2);
            $table->decimal('temperature_max', 5, 2);
            $table->decimal('humidity', 5, 2);
            $table->decimal('rainfall_probability', 5, 2);
            $table->decimal('wind_speed', 5, 2);
            $table->string('conditions');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('forecasts');
    }
};
