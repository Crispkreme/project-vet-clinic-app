<?php

namespace App\Providers;

use App\Contracts\AppointmentContract;

use App\Contracts\PetContract;
use App\Contracts\UserContract;
use App\Repositories\AppointmentRepository;
use App\Repositories\PetRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryProvider extends ServiceProvider
{
    protected $repositories = [
        PetContract::class => PetRepository::class,
        AppointmentContract::class => AppointmentRepository::class,
        UserContract::class => UserRepository::class,
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
