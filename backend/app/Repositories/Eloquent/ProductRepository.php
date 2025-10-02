<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductRepository implements ProductRepositoryInterface
{
    protected $model;

    public function __construct(Product $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        return $this->model->with(['farmer', 'category', 'reviews'])->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $product = $this->model->find($id);
        if ($product) {
            $product->update($data);
            return $product;
        }
        return null;
    }

    public function delete($id)
    {
        $product = $this->find($id);
        if ($product) {
            return $product->delete();
        }
        return false;
    }

    public function getAllWithFilters(array $filters = [])
    {
        $query = $this->model->with(['farmer', 'category', 'reviews']);

        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['farmer_id'])) {
            $query->where('farmer_id', $filters['farmer_id']);
        }

        if (isset($filters['min_price'])) {
            $query->where('price_per_unit', '>=', $filters['min_price']);
        }

        if (isset($filters['max_price'])) {
            $query->where('price_per_unit', '<=', $filters['max_price']);
        }

        if (isset($filters['organic_certified'])) {
            $query->where('organic_certified', $filters['organic_certified']);
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function getByFarmer($farmerId)
    {
        return $this->model->where('farmer_id', $farmerId)
                          ->with(['category', 'reviews'])
                          ->get();
    }

    public function getByCategory($categoryId)
    {
        return $this->model->where('category_id', $categoryId)
                          ->with(['farmer', 'reviews'])
                          ->paginate(15);
    }

    public function getAvailableProducts()
    {
        return $this->model->where('status', 'available')
                          ->where('quantity_available', '>', 0)
                          ->with(['farmer', 'category'])
                          ->get();
    }

    public function searchProducts($query)
    {
        return $this->model->where(function($q) use ($query) {
                            $q->where('name', 'LIKE', "%{$query}%")
                              ->orWhere('description', 'LIKE', "%{$query}%");
                          })
                          ->with(['farmer', 'category', 'reviews'])
                          ->paginate(15);
    }
}
