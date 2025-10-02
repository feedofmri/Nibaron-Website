<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'notifications',
        'preferences'
    ];

    protected $casts = [
        'notifications' => 'array',
        'preferences' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
