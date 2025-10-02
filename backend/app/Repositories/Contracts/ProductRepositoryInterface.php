<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryInterface
{
    public function find($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function getAllWithFilters(array $filters = []);
    public function getByFarmer($farmerId);
    public function getByCategory($categoryId);
    public function getAvailableProducts();
    public function searchProducts($query);
}
