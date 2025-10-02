<?php

namespace App\Http\Controllers\Api\V1\Order;

use App\Http\Controllers\Controller;
use App\Models\PreOrder;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class PreOrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = PreOrder::with(['product', 'buyer'])
            ->where('buyer_id', $request->user()->id);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $preOrders = $query->orderBy('created_at', 'desc')->paginate(15);

        return response()->json([
            'status' => 'success',
            'data' => $preOrders
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|numeric|min:1',
            'expected_price' => 'required|numeric|min:0',
            'delivery_date' => 'required|date|after:today',
            'notes' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $product = Product::find($request->product_id);

        $preOrder = PreOrder::create([
            'buyer_id' => $request->user()->id,
            'product_id' => $request->product_id,
            'farmer_id' => $product->farmer_id,
            'quantity' => $request->quantity,
            'expected_price' => $request->expected_price,
            'delivery_date' => $request->delivery_date,
            'notes' => $request->notes,
            'status' => 'pending'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pre-order created successfully',
            'data' => $preOrder->load(['product', 'buyer'])
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $preOrder = PreOrder::with(['product', 'buyer', 'farmer'])
            ->where('buyer_id', request()->user()->id)
            ->find($id);

        if (!$preOrder) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pre-order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $preOrder
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $preOrder = PreOrder::where('buyer_id', $request->user()->id)->find($id);

        if (!$preOrder) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pre-order not found'
            ], 404);
        }

        if ($preOrder->status !== 'pending') {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot update pre-order that is not pending'
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'quantity' => 'sometimes|numeric|min:1',
            'expected_price' => 'sometimes|numeric|min:0',
            'delivery_date' => 'sometimes|date|after:today',
            'notes' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $preOrder->update($request->only([
            'quantity', 'expected_price', 'delivery_date', 'notes'
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'Pre-order updated successfully',
            'data' => $preOrder->load(['product', 'buyer'])
        ]);
    }

    public function cancel($id): JsonResponse
    {
        $preOrder = PreOrder::where('buyer_id', request()->user()->id)->find($id);

        if (!$preOrder) {
            return response()->json([
                'status' => 'error',
                'message' => 'Pre-order not found'
            ], 404);
        }

        if (!in_array($preOrder->status, ['pending', 'confirmed'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cannot cancel this pre-order'
            ], 400);
        }

        $preOrder->update(['status' => 'cancelled']);

        return response()->json([
            'status' => 'success',
            'message' => 'Pre-order cancelled successfully'
        ]);
    }
}
