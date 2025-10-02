<?php

namespace App\Repositories\Eloquent;

use App\Models\Farmer;
use App\Repositories\Contracts\FarmerRepositoryInterface;

class FarmerRepository implements FarmerRepositoryInterface
{
    protected $model;

    public function __construct(Farmer $model)
    {
        $this->model = $model;
    }

    public function find($id)
    {
        return $this->model->with(['user', 'farms', 'products'])->find($id);
    }

    public function findByUserId($userId)
    {
        return $this->model->where('user_id', $userId)->first();
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $farmer = $this->model->find($id);
        if ($farmer) {
            $farmer->update($data);
            return $farmer;
        }
        return null;
    }

    public function delete($id)
    {
        $farmer = $this->find($id);
        if ($farmer) {
            return $farmer->delete();
        }
        return false;
    }

    public function getAllWithFilters(array $filters = [])
    {
        $query = $this->model->with(['user', 'farms']);

        if (isset($filters['district'])) {
            $query->where('district', $filters['district']);
        }

        if (isset($filters['upazila'])) {
            $query->where('upazila', $filters['upazila']);
        }

        if (isset($filters['verification_status'])) {
            $query->where('verification_status', $filters['verification_status']);
        }

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function getVerifiedFarmers()
    {
        return $this->model->where('verification_status', true)
                          ->with(['user', 'farms'])
                          ->get();
    }

    public function getFarmersByLocation($district, $upazila = null)
    {
        $query = $this->model->where('district', $district);

        if ($upazila) {
            $query->where('upazila', $upazila);
        }

        return $query->with(['user', 'farms'])->get();
    }
}
