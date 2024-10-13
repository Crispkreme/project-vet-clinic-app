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
        $pets = $this->petContract->getPetByOwner($userId);

        return Inertia::render('User/Pets/PetList', [
            'pets' => $pets,
        ]);
    }

    public function petStore(Request $request)
    {
        DB::beginTransaction();

        try {

            $validated = $request->validate([
                'user_id' => 'nullable|exists:users,id',
                'name' => 'required|string|max:50',
                'breed' => 'nullable|string|max:50',
                'age' => 'nullable|integer|min:0|max:99',
                'weight' => 'nullable|numeric|min:0|max:999.99',
                'medical_history' => 'nullable|string',
                'status' => 'nullable|in:Healthy,Due for Vaccination,Under Treatment,Post-Surgery,Needs Medication,In Quarantine,Emergency,Adopted,Lost,Pending Vet Visit',
            ]);

            $this->petContract->createOrUpdatePet($validated);

            DB::commit();

            Session::flash('success', 'Pet saved successfully!');
            return response()->json(['success' => true]);

        } catch (Exception $e) {

            Log::error('Error during petStore: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollback();

            Session::flash('error', 'An error occurred during registration.');
            return response()->json(['error' => true]);
        }
    }
}
