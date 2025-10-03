<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\Auth\RegisterController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\LogoutController;
use App\Http\Controllers\Api\V1\Farmer\FarmerController;
use App\Http\Controllers\Api\V1\Product\ProductController;
use App\Http\Controllers\CropPredictionController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Api\V1\User\ProfileController;
use App\Http\Controllers\Api\V1\User\SettingsController;
use App\Http\Controllers\Api\V1\Order\PreOrderController;
use App\Http\Controllers\Api\V1\Order\OrderController;
use App\Http\Controllers\Api\V1\Community\PostController;
use App\Http\Controllers\Api\V1\Support\HelpController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Authentication routes (public)
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

// Public product routes - allow visitors to browse marketplace
Route::get('/products', [ProductController::class, 'index']); // Get all products
Route::get('/products/{id}', [ProductController::class, 'show']); // Get single product
Route::get('/products/search', [ProductController::class, 'search']); // Search products
Route::get('/products/category/{category}', [ProductController::class, 'getByCategory']); // Get by category

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/change-password', [ProfileController::class, 'changePassword']);

    // Settings routes
    Route::get('/settings', [SettingsController::class, 'index']);
    Route::put('/settings/notifications', [SettingsController::class, 'updateNotifications']);
    Route::put('/settings/preferences', [SettingsController::class, 'updatePreferences']);
    Route::delete('/settings/account', [SettingsController::class, 'deleteAccount']);

    // Farmer routes
    Route::apiResource('farmers', FarmerController::class);

    // Protected product actions (cart, wishlist, etc.)
    Route::post('/products/{id}/add-to-cart', [ProductController::class, 'addToCart']);
    Route::post('/products/{id}/add-to-wishlist', [ProductController::class, 'addToWishlist']);
    Route::delete('/products/{id}/remove-from-wishlist', [ProductController::class, 'removeFromWishlist']);

    // Product management (for farmers/admins)
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Crop prediction routes
    Route::get('/crop-predictions', [CropPredictionController::class, 'index']);

    // Search routes
    Route::get('/search', [SearchController::class, 'index']);

    // Notification routes
    Route::get('/notifications', [NotificationController::class, 'index']);

    // Pre-Orders routes
    Route::apiResource('pre-orders', PreOrderController::class);
    Route::post('/pre-orders/{id}/cancel', [PreOrderController::class, 'cancel']);

    // Orders routes
    Route::apiResource('orders', OrderController::class)->only(['index', 'show']);
    Route::post('/orders', [OrderController::class, 'store']); // Place new order

    // Cart routes
    Route::get('/cart', [\App\Http\Controllers\Api\V1\Cart\CartController::class, 'index']);
    Route::post('/cart/items', [\App\Http\Controllers\Api\V1\Cart\CartController::class, 'addItem']);
    Route::put('/cart/items/{id}', [\App\Http\Controllers\Api\V1\Cart\CartController::class, 'updateItem']);
    Route::delete('/cart/items/{id}', [\App\Http\Controllers\Api\V1\Cart\CartController::class, 'removeItem']);
    Route::delete('/cart/clear', [\App\Http\Controllers\Api\V1\Cart\CartController::class, 'clear']);

    // Community routes
    Route::apiResource('community/posts', PostController::class);

    // Help & Support routes
    Route::get('/support/faqs', [HelpController::class, 'getFAQs']);
    Route::get('/support/contact', [HelpController::class, 'getContactInfo']);
    Route::apiResource('support/tickets', HelpController::class, [
        'names' => [
            'index' => 'support.tickets.index',
            'store' => 'support.tickets.store',
            'show' => 'support.tickets.show'
        ]
    ])->only(['index', 'store', 'show']);
});
