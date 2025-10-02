<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Buyer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'buyer_type',
        'business_name',
        'phone',
        'address',
        'district',
        'registration_number',
        'tax_id',
        'verification_status',
        'business_license',
        'profile_image'
    ];

    protected $casts = [
        'verification_status' => 'boolean'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    // Scope for buyer types
    public function scopeWholesalers($query)
    {
        return $query->where('buyer_type', 'wholesaler');
    }

    public function scopeRetailers($query)
    {
        return $query->where('buyer_type', 'retailer');
    }

    public function scopeExporters($query)
    {
        return $query->where('buyer_type', 'exporter');
    }

    public function scopeVerified($query)
    {
        return $query->where('verification_status', true);
    }
}
