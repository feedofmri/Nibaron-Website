<?php

namespace App\Http\Controllers\Api\V1\Product;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['farmer', 'category', 'reviews']);

        if ($request->has('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->has('farmer')) {
            $query->where('farmer_id', $request->farmer);
        }

        $products = $query->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $products
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $product = Product::create($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully',
            'data' => $product
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $product = Product::with(['farmer', 'category', 'reviews'])->find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        $product->update($request->validated());

        return response()->json([
            'status' => 'success',
            'message' => 'Product updated successfully',
            'data' => $product
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product deleted successfully'
        ]);
    }

    // Cart functionality
    public function addToCart(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        $user = $request->user();

        // Check if product is already in cart
        $cartItem = $user->cartItems()->where('product_id', $id)->first();

        if ($cartItem) {
            // Update quantity if already in cart
            $cartItem->quantity += $request->input('quantity', 1);
            $cartItem->save();
        } else {
            // Add new item to cart
            $user->cartItems()->create([
                'product_id' => $id,
                'quantity' => $request->input('quantity', 1),
                'price' => $product->price
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Product added to cart successfully'
        ]);
    }

    // Wishlist functionality
    public function addToWishlist(Request $request, $id): JsonResponse
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        $user = $request->user();

        // Check if product is already in wishlist
        $wishlistItem = $user->wishlistItems()->where('product_id', $id)->first();

        if ($wishlistItem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product is already in your wishlist'
            ], 409);
        }

        // Add to wishlist
        $user->wishlistItems()->create([
            'product_id' => $id
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Product added to wishlist successfully'
        ]);
    }

    public function removeFromWishlist(Request $request, $id): JsonResponse
    {
        $user = $request->user();

        $wishlistItem = $user->wishlistItems()->where('product_id', $id)->first();

        if (!$wishlistItem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found in wishlist'
            ], 404);
        }

        $wishlistItem->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Product removed from wishlist successfully'
        ]);
    }
}
