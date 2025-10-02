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
            'shipping_address' => 'required|string'
        ]);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'order_number' => 'ORD-' . time(),
            'status' => 'pending',
            'shipping_address' => $request->shipping_address,
            'total_amount' => 0
        ]);

        $totalAmount = 0;
        foreach ($request->items as $item) {
            $product = Product::find($item['product_id']);
            $itemTotal = $product->price_per_unit * $item['quantity'];

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $product->price_per_unit,
                'total_price' => $itemTotal
            ]);

            $totalAmount += $itemTotal;
        }

        $order->update(['total_amount' => $totalAmount]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'data' => $order->load('orderItems.product')
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
