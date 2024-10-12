<?php

namespace App\Http\Controllers;

use App\Contracts\PetContract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $petContract;

    public function __construct(
        PetContract $petContract,
    ) {
        $this->petContract = $petContract;
    }

    public function user()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userId = $user->id;
        $pets = $this->petContract->getPetByOwner($userId);

        return Inertia::render('User/Dashboard', [
            'pets' => $pets,
        ]);
    }
}
