<?php

namespace App\Repositories\Contracts;

interface FarmerRepositoryInterface
{
    public function find($id);
    public function findByUserId($userId);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function getAllWithFilters(array $filters = []);
    public function getVerifiedFarmers();
    public function getFarmersByLocation($district, $upazila = null);
}
