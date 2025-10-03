<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'buyer_id',
        'order_number',
        'status',
        'delivery_option',
        'delivery_address',
        'phone_number',
        'payment_method',
        'payment_status',
        'subtotal',
        'delivery_fee',
        'total_amount',
        'notes',
        'expected_delivery',
        'delivered_at'
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'expected_delivery' => 'date',
        'delivered_at' => 'datetime'
    ];

    public function buyer(): BelongsTo
    {
        return $this->belongsTo(Buyer::class);
    }

    // Keep user relationship through buyer for convenience
    public function user(): BelongsTo
    {
        return $this->hasOneThrough(User::class, Buyer::class, 'id', 'id', 'buyer_id', 'user_id');
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }
}
