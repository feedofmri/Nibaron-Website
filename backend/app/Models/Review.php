<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'buyer_id',
        'rating',
        'comment',
        'verified_purchase',
        'helpful_count'
    ];

    protected $casts = [
        'rating' => 'integer',
        'verified_purchase' => 'boolean'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(Buyer::class);
    }

    // Keep user relationship through buyer for convenience
    public function user(): BelongsTo
    {
        return $this->hasOneThrough(User::class, Buyer::class, 'id', 'id', 'buyer_id', 'user_id');
    }
}
