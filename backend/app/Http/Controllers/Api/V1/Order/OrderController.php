<?php

namespace App\Http\Controllers\Api\V1\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Order::with(['user', 'orderItems.product']);

        if ($request->user()->user_type === 'farmer') {
            $query->whereHas('orderItems.product', function($q) use ($request) {
                $q->where('farmer_id', $request->user()->farmer->id);
            });
        } else {
            $query->where('user_id', $request->user()->id);
        }

        $orders = $query->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.price' => 'required|numeric|min:0',
            'delivery_option' => 'required|in:pickup,delivery',
            'delivery_address' => 'required_if:delivery_option,delivery|string',
            'phone_number' => 'required|string',
            'payment_method' => 'required|in:cod,bkash,nagad,bank',
            'total_amount' => 'required|numeric|min:0'
        ]);

        // Create order
        $order = Order::create([
            'user_id' => $request->user()->id,
            'order_number' => 'ORD-' . time() . '-' . rand(1000, 9999),
            'status' => 'pending',
            'delivery_option' => $request->delivery_option,
            'delivery_address' => $request->delivery_address,
            'phone_number' => $request->phone_number,
            'payment_method' => $request->payment_method,
            'subtotal' => $request->total_amount - ($request->delivery_option === 'delivery' ? 50 : 0),
            'delivery_fee' => $request->delivery_option === 'delivery' ? 50 : 0,
            'total_amount' => $request->total_amount
        ]);

        // Create order items
        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['price'],
                'subtotal' => $item['quantity'] * $item['price']
            ]);

            // Optionally: Reduce product quantity
            // $product = Product::find($item['product_id']);
            // $product->quantity_available -= $item['quantity'];
            // $product->save();
        }

        // Clear cart after order
        $cart = \App\Models\Cart::where('user_id', $request->user()->id)->first();
        if ($cart) {
            $cart->cartItems()->delete();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order placed successfully',
            'data' => $order->load(['orderItems.product'])
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $order = Order::with(['user', 'orderItems.product'])->find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }

    public function updateStatus(Request $request, $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled'
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        $order->update(['status' => $request->status]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order status updated successfully',
            'data' => $order
        ]);
    }
}
