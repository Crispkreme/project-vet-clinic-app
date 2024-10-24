<?php

namespace App\Contracts;

interface UserContract {

    public function getAllUser();
    public function getAllDoctor();
    public function getAllOwner();
    public function getUserByUserId($id);
}
