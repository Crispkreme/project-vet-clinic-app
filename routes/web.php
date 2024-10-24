<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaypalController;
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

    // DOCTOR
    Route::get('/admin/client/doctor', [UserController::class, 'getClient'])->name('admin.client.doctor');

    // PAYMENT
    Route::get('/admin/payment', [PaymentController::class, 'getPayment'])->name('admin.payment');

    // CHAT
    Route::get('/admin/message/{id}', [ChatController::class, 'viewMessage'])->name('admin.message');
    Route::get('/admin/owner/message/{id}', [ChatController::class, 'viewOwnerMessage'])->name('admin.owner.message');
    Route::post('/admin/send/message/{id}', [ChatController::class, 'sentMessage'])->name('admin.send.message');
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

    // DOCTOR
    Route::get('/user/doctor', [UserController::class, 'getDoctor'])->name('user.doctor');

    // PAYMENT
    Route::get('/user/payment', [PaymentController::class, 'getPaymentByUser'])->name('user.payment');
    Route::post('/user/pay/paypal', [PaypalController::class, 'payPaypal'])->name('user.pay.paypal');
    Route::get('/user/paypal/success', [PaypalController::class, 'paypalSuccess'])->name('user.paypal.success');
    Route::get('/user/paypal/cancel', [PaypalController::class, 'paypalCancel'])->name('user.paypal.cancel');

    // EMAIL FUNCTIONALITY
    Route::get('/user/email', [PaymentController::class, 'emailTest'])->name('user.email');

    // CHAT FUNCTIONALITY
    Route::get('/user/message/{id}', [ChatController::class, 'viewMessage'])->name('user.message');
    Route::get('/user/doctor/message/{id}', [ChatController::class, 'viewDoctorMessage'])->name('user.doctor.message');
    Route::post('/user/send/message/{id}', [ChatController::class, 'sentMessage'])->name('user.send.message');
});

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
