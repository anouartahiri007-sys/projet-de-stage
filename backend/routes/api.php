<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
        Route::get('/user', [AuthController::class, 'userProfile']);
    });
});

/*
|--------------------------------------------------------------------------
| Application Routes (Protected via Role)
|--------------------------------------------------------------------------
*/
use App\Http\Controllers\ConcoursController;
use App\Http\Controllers\CandidatureController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PdfController;

Route::middleware(['auth:api'])->group(function () {
    // Public (authenticated candidates can read)
    Route::get('/concours', [ConcoursController::class, 'index']);
    Route::get('/concours/{concours}', [ConcoursController::class, 'show']);
    Route::get('/pdf/attestation/{fonctionnaire}', [PdfController::class, 'generateAttestation']);
    
    // Candidate Actions
    Route::middleware('role:candidat')->group(function () {
        Route::post('/concours/{concours}/apply', [CandidatureController::class, 'apply']);
        Route::post('/documents/upload', [DocumentController::class, 'upload']);
    });

    // HR Admin Actions
    Route::middleware('role:rh_admin')->group(function () {
        Route::post('/concours', [ConcoursController::class, 'store']);
        Route::patch('/candidatures/{candidature}/status', [CandidatureController::class, 'updateStatus']);
    });
});
