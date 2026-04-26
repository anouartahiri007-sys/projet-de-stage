<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Models\Employee;
use App\Observers\AuditObserver;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Employee::observe(AuditObserver::class);
    }
}
