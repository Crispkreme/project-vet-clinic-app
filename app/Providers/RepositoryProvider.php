<?php

namespace App\Providers;

use App\Contracts\AppointmentContract;

use App\Contracts\InvoiceContract;
use App\Contracts\PaypalContract;
use App\Contracts\PetContract;
use App\Contracts\PrescriptionContract;
use App\Contracts\ReceiptContract;
use App\Contracts\UserContract;
use App\Repositories\AppointmentRepository;
use App\Repositories\InvoiceRepository;
use App\Repositories\PaypalRepository;
use App\Repositories\PetRepository;
use App\Repositories\PrescriptionRepository;
use App\Repositories\ReceiptRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    protected $repositories = [
        PetContract::class => PetRepository::class,
        AppointmentContract::class => AppointmentRepository::class,
        UserContract::class => UserRepository::class,
        PrescriptionContract::class => PrescriptionRepository::class,
        InvoiceContract::class => InvoiceRepository::class,
        PaypalContract::class => PaypalRepository::class,
        ReceiptContract::class => ReceiptRepository::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        foreach($this->repositories as $contract => $repository) {
            $this->app->singleton($contract,$repository);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
