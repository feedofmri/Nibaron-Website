<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Farmer;
use App\Models\Category;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');
        if (!$query) {
            return response()->json([]);
        }

        $results = [];

        // Search products
        $products = Product::where('name', 'like', "%$query%")
            ->orWhere('description', 'like', "%$query%")
            ->limit(5)
            ->get();
        foreach ($products as $product) {
            $results[] = [
                'id' => $product->id,
                'type' => 'product',
                'title' => $product->name,
                'subtitle' => $product->category->name . ' • ' . $product->region,
                'image' => $product->image_url,
                'price' => $product->price,
            ];
        }

        // Search farmers
        $farmers = Farmer::where('name', 'like', "%$query%")
            ->limit(3)
            ->get();
        foreach ($farmers as $farmer) {
            $results[] = [
                'id' => $farmer->id,
                'type' => 'farmer',
                'title' => $farmer->name,
                'subtitle' => $farmer->district,
                'image' => $farmer->profile_photo_url,
            ];
        }

        // Search categories
        $categories = Category::where('name', 'like', "%$query%")
            ->limit(2)
            ->get();
        foreach ($categories as $category) {
            $results[] = [
                'id' => $category->id,
                'type' => 'category',
                'title' => $category->name,
                'subtitle' => 'Category',
            ];
        }

        return response()->json($results);
    }
}

