<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'post_type',
        'crop_type',
        'quantity',
        'expected_price',
        'delivery_date',
        'location',
        'images',
        'tags',
        'category',
        'status',
        'likes_count',
        'comments_count'
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'expected_price' => 'decimal:2',
        'delivery_date' => 'date',
        'images' => 'array',
        'tags' => 'array',
        'likes_count' => 'integer',
        'comments_count' => 'integer'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}
