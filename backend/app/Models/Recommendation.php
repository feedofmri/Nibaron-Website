<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'farmer_id',
        'type',
        'title',
        'description',
        'priority',
        'data',
        'is_read',
        'expires_at'
    ];

    protected $casts = [
        'data' => 'array',
        'is_read' => 'boolean',
        'expires_at' => 'datetime'
    ];

    public function farmer(): BelongsTo
    {
        return $this->belongsTo(Farmer::class);
    }
}
