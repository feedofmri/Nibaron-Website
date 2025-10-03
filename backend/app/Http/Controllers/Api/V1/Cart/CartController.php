<?php

namespace App\Http\Controllers\Api\V1\Cart;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $cart = Cart::with(['cartItems.product'])
                   ->where('user_id', $request->user()->id)
                   ->first();

        if (!$cart) {
            $cart = Cart::create(['user_id' => $request->user()->id]);
        }

        return response()->json([
            'status' => 'success',
            'data' => $cart
        ]);
    }

    public function addItem(Request $request): JsonResponse
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:0.01'
        ]);

        $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        $product = Product::find($request->product_id);

        // Check if product has enough quantity
        if ($product->quantity_available < $request->quantity) {
            return response()->json([
                'status' => 'error',
                'message' => 'Insufficient quantity available'
            ], 400);
        }

        $cartItem = CartItem::updateOrCreate(
            [
                'cart_id' => $cart->id,
                'product_id' => $request->product_id
            ],
            [
                'quantity' => $request->quantity,
                'unit_price' => $product->price_per_unit
            ]
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Item added to cart successfully',
            'data' => $cartItem->load('product')
        ]);
    }

    public function removeItem(Request $request, $itemId): JsonResponse
    {
        $cartItem = CartItem::whereHas('cart', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->find($itemId);

        if (!$cartItem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart item not found'
            ], 404);
        }

        $cartItem->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Item removed from cart successfully'
        ]);
    }

    public function clear(Request $request): JsonResponse
    {
        $cart = Cart::where('user_id', $request->user()->id)->first();

        if ($cart) {
            $cart->cartItems()->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Cart cleared successfully'
        ]);
    }

    public function updateItem(Request $request, $itemId): JsonResponse
    {
        $request->validate([
            'quantity' => 'required|numeric|min:0.01'
        ]);

        $cartItem = CartItem::whereHas('cart', function($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->find($itemId);

        if (!$cartItem) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart item not found'
            ], 404);
        }

        // Check if product has enough quantity
        if ($cartItem->product->quantity_available < $request->quantity) {
            return response()->json([
                'status' => 'error',
                'message' => 'Insufficient quantity available'
            ], 400);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'status' => 'success',
            'message' => 'Cart item updated successfully',
            'data' => $cartItem->load('product')
        ]);
    }
}
