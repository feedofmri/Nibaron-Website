<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'farmer_id',
        'category_id',
        'name',
        'description',
        'price_per_unit',
        'unit_type',
        'quantity_available',
        'harvest_date',
        'expiry_date',
        'quality_grade',
        'organic_certified',
        'images',
        'status'
    ];

    protected $casts = [
        'price_per_unit' => 'decimal:2',
        'quantity_available' => 'decimal:2',
        'harvest_date' => 'date',
        'expiry_date' => 'date',
        'organic_certified' => 'boolean',
        'images' => 'array'
    ];

    public function farmer(): BelongsTo
    {
        return $this->belongsTo(Farmer::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
