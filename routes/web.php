<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [HomeController::class, 'dashboard'])->name('admin.dashboard');
    
    Route::get('/admin/petlist', [PetController::class, 'petList'])->name('admin.petlist');
    Route::post('/admin/store', [PetController::class, 'petStore'])->name('admin.store');
    Route::post('/admin/update/{id}', [PetController::class, 'petStore'])->name('admin.update');
});

// User routes
Route::middleware(['auth', 'verified', 'user'])->group(function () {
    Route::get('/user/dashboard', [UserController::class, 'user'])->name('user.dashboard');

    // PET LIST
    Route::get('/user/petlist', [PetController::class, 'petList'])->name('user.petlist');
    Route::post('/user/store', [PetController::class, 'petStore'])->name('user.store');
    Route::post('/user/update/{id}', [PetController::class, 'petStore'])->name('user.update');

    // APPOINTMENT
    Route::get('/user/appointment', [AppointmentController::class, 'appointment'])->name('user.appointment');
    Route::post('/user/appointment/store', [AppointmentController::class, 'storeAppointment'])->name('user.appointment.store');
});

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
