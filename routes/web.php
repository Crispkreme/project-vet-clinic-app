<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ProfileController;
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

    // APPOINTMENT
    Route::get('/admin/appointment', [AppointmentController::class, 'appointmentList'])->name('admin.appointment');
    Route::get('/admin/calendar', [AppointmentController::class, 'appointmentCalendar'])->name('admin.calendar');
    Route::post('/admin/appointment/store', [AppointmentController::class, 'storeAppointment'])->name('admin.appointment.store');
    Route::post('/admin/appointment/update/{id}', [AppointmentController::class, 'storeAppointment'])->name('admin.appointment.update');
    Route::post('/admin/admit/appointment/{id}', [AppointmentController::class, 'admitAppointment'])->name('admin.admit.appointment');

    // PRESCRIPTION
    Route::get('/admin/prescription', [PrescriptionController::class, 'prescription'])->name('admin.prescription');
    Route::post('/admin/create/prescription/{id}', [PrescriptionController::class, 'createOrUpdatePrescription'])->name('admin.create.prescription');
});

// User routes
Route::middleware(['auth', 'verified', 'user'])->group(function () {
    Route::get('/user/dashboard', [UserController::class, 'user'])->name('user.dashboard');

    // PET LIST
    Route::get('/user/petlist', [PetController::class, 'petList'])->name('user.petlist');
    Route::post('/user/store', [PetController::class, 'petStore'])->name('user.store');
    Route::post('/user/update/{id}', [PetController::class, 'petStore'])->name('user.update');

    // APPOINTMENT
    Route::get('/user/calendar', [AppointmentController::class, 'ownerCalendar'])->name('user.calendar');
    Route::post('/user/appointment/store', [AppointmentController::class, 'storeAppointment'])->name('user.appointment.store');
});

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
