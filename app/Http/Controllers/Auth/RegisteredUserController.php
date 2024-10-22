<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        DB::beginTransaction();

        try {
            $request->validate([
                'usertype' => 'required|string|max:20',
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|lowercase|max:255|unique:'.User::class,
                'phone_number' => 'required|string|regex:/^\+63\d{10}$/',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            
            $user = User::create([
                'usertype' => $request->usertype,
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'password' => Hash::make($request->password),
            ]);

            DB::commit();

            event(new Registered($user));

            Auth::login($user);

            return redirect()->intended(route($user->usertype === 'admin' ? 'admin.dashboard' : 'user.dashboard'));

        } catch (Exception $e) {

            Log::error('Error during registration: ' . $e->getMessage(), [
                'exception' => $e,
                'trace' => $e->getTraceAsString(),
            ]);

            DB::rollback();

            return redirect()->back()->withErrors(['error' => 'An error occurred during registration.']);
        }
    }

}
