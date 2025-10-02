<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'product_id',
        'farmer_id',
        'quantity',
        'expected_price',
        'delivery_date',
        'notes',
        'status'
    ];

    protected $casts = [
        'delivery_date' => 'date',
        'expected_price' => 'decimal:2'
    ];

    public function buyer()
    {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function farmer()
    {
        return $this->belongsTo(User::class, 'farmer_id');
    }
}
