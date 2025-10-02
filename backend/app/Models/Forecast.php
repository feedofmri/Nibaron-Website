<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forecast extends Model
{
    use HasFactory;

    protected $fillable = [
        'location',
        'latitude',
        'longitude',
        'forecast_date',
        'temperature_min',
        'temperature_max',
        'humidity',
        'rainfall_probability',
        'wind_speed',
        'conditions',
        'created_at'
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'forecast_date' => 'date',
        'temperature_min' => 'decimal:2',
        'temperature_max' => 'decimal:2',
        'humidity' => 'decimal:2',
        'rainfall_probability' => 'decimal:2',
        'wind_speed' => 'decimal:2'
    ];
}
