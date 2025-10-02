<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hazard extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'severity',
        'location',
        'latitude',
        'longitude',
        'description',
        'affected_area',
        'start_time',
        'end_time',
        'status'
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'start_time' => 'datetime',
        'end_time' => 'datetime'
    ];
}
