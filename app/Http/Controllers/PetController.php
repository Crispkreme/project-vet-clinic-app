<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetController extends Controller
{
    public function petList()
    {
        $pets = Pet::get();
        return Inertia::render('User/Pets/PetList', [
            'pets' => $pets,
        ]);
    }
}
