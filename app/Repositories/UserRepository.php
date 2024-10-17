<?php

namespace App\Repositories;

use App\Models\User;
use App\Contracts\UserContract;

class UserRepository implements UserContract
{

    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function getAllUser()
    {
        return $this->model->get();
    }

    public function getAllDoctor() 
    {
        return $this->model->where('usertype', 'admin')->get();
    }
    public function getAllOwner() 
    {
        return $this->model->where('usertype', 'user')->get();
    }
}
