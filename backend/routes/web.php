<?php

use Illuminate\Support\Facades\Route;

// Health check route for Railway
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'app' => config('app.name')
    ]);
});

Route::get('/', function () {
    return view('welcome');
});
