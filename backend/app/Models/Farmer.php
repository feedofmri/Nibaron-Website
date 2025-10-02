<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Farmer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nid',
        'phone',
        'address',
        'district',
        'upazila',
        'union',
        'village',
        'farming_experience',
        'total_land',
        'verification_status',
        'profile_image'
    ];

    protected $casts = [
        'farming_experience' => 'integer',
        'total_land' => 'decimal:2',
        'verification_status' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function farms(): HasMany
    {
        return $this->hasMany(Farm::class);
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
