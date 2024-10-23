<?php

namespace App\Http\Controllers;

use App\Contracts\PetContract;
use App\Models\Pet;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Session;

class PetController extends Controller
{
    protected $petContract;

    public function __construct(
        PetContract $petContract,
    ) {
        $this->petContract = $petContract;
    }

    public function petList()
    {
        $user = Auth::user();

        if (!$user) {
            return redirect()->route('login');
        }

        $userId = $user->id;
        $userType = $user->usertype;

        if ($userType === 'admin') {
            $pets = $this->petContract->getAllPet();
            return Inertia::render('Admin/Pets/PetList', [
                'pets' => $pets,
            ]);
        } else {
            $pets = $this->petContract->getPetByOwner($userId);
            return Inertia::render('User/Pets/PetList', [
                'pets' => $pets,
            ]);
        }
    }

    public function petStore(Request $request, $id = null) 
    {   
        DB::beginTransaction();
        $request = $request->except('age');
        // dd($request);

        // $dataWithoutAge = $request
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required|string|max:50',
            'breed' => 'nullable|string|max:50',
            'birthday' => 'nullable|date|max:20',
            // 'age' => 'nullable|integer|min:0|max:99',
            'weight' => 'nullable|numeric|min:0|max:999.99',
            'medical_history' => 'nullable|string',
            'status' => 'nullable|in:Healthy,Due for Vaccination,Under Treatment,Post-Surgery,Needs Medication,In Quarantine,Emergency,Adopted,Lost,Pending Vet Visit',
        ]);
        // dd($validated);
        try {
            

            if ($id) {
                $validated['id'] = $id; 
                $this->petContract->createOrUpdatePet($validated);
            } else {
                $this->petContract->createOrUpdatePet($validated);
            }

            DB::commit();

            Session::flash('success', 'Pet saved successfully!');


        } catch (Exception $e) {
            Log::error('Error during petStore: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollback();

            Session::flash('error', 'An error occurred during registration.');
            // return response()->json(['error' => true]);

            return redirect()->route('user.petlist');
        }
    }

}
