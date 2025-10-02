<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HazardAlert extends Model
{
    use HasFactory;

    protected $fillable = [
        'hazard_id',
        'farmer_id',
        'alert_level',
        'message',
        'sent_at',
        'acknowledged_at'
    ];

    protected $casts = [
        'sent_at' => 'datetime',
        'acknowledged_at' => 'datetime'
    ];

    public function hazard(): BelongsTo
    {
        return $this->belongsTo(Hazard::class);
    }

    public function farmer(): BelongsTo
    {
        return $this->belongsTo(Farmer::class);
    }
}
