 <?php

namespace App\Repositories\Contracts;

interface UserRepositoryInterface
{
    public function find($id);
    public function findByEmail($email);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function getAllPaginated($perPage = 15);
    public function getByUserType($userType);
}
