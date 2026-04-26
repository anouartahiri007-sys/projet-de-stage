<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class HealthCheckController extends Controller
{
    public function check()
    {
        $status = [
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'services' => [
                'database' => $this->checkDatabase(),
                'cache' => $this->checkCache(),
            ]
        ];

        return response()->json($status);
    }

    protected function checkDatabase()
    {
        try {
            DB::connection()->getPdo();
            return 'up';
        } catch (\Exception $e) {
            return 'down';
        }
    }

    protected function checkCache()
    {
        try {
            Cache::put('health_check', true, 10);
            return Cache::get('health_check') ? 'up' : 'down';
        } catch (\Exception $e) {
            return 'down';
        }
    }
}
