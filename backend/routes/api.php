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
    Route::post('/candidat-register', [AuthController::class, 'candidatRegister']);
    Route::post('/candidat-login', [AuthController::class, 'candidatLogin']);

    Route::get('/test-email', function() {
        try {
            \Illuminate\Support\Facades\Mail::raw('This is a test email from Laravel!', function ($message) {
                $message->to('test@example.com')->subject('Test Email');
            });
            return 'Email sent successfully! Check Mailtrap or your Log.';
        } catch (\Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
    });

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
use App\Http\Controllers\AdministrativeActController;

Route::middleware(['auth:api'])->group(function () {
    // Public (authenticated candidates can read)
    Route::get('/concours', [ConcoursController::class, 'index']);
    Route::get('/concours/{concours}', [ConcoursController::class, 'show']);
    Route::get('/pdf/attestation/{fonctionnaire}', [PdfController::class, 'generateAttestation']);
    
    // User Settings
    Route::get('/settings', [\App\Http\Controllers\SettingsController::class, 'getSettings']);
    Route::post('/settings', [\App\Http\Controllers\SettingsController::class, 'updateSettings']);
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index']);
    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllAsRead']);
    Route::post('/notifications/{id}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{id}', [\App\Http\Controllers\NotificationController::class, 'destroy']);
    
    // Candidate Actions
    Route::middleware('role:candidat')->group(function () {
        Route::get('/candidatures/my', [CandidatureController::class, 'myCandidatures']);
        Route::post('/concours/{concours}/apply', [CandidatureController::class, 'apply']);
        Route::post('/documents/upload', [DocumentController::class, 'upload']);
    });

    // Fonctionnaire Actions
    Route::middleware('role:fonctionnaire')->group(function () {
        Route::get('/leaves/my', [\App\Http\Controllers\LeaveRequestController::class, 'myLeaves']);
        Route::post('/leaves', [\App\Http\Controllers\LeaveRequestController::class, 'store']);
        Route::get('/payroll/my', [\App\Http\Controllers\PayrollController::class, 'myPayroll']);
        
        // Medical specific
        Route::post('/medical-records', [\App\Http\Controllers\MedicalRecordController::class, 'store']);
        Route::get('/medical-records', [\App\Http\Controllers\MedicalRecordController::class, 'index']);
    });

    // HR Admin Actions
    Route::middleware('role:rh,rh_admin,admin')->group(function () {
        Route::post('/concours', [ConcoursController::class, 'store']);
        Route::get('/candidatures', [CandidatureController::class, 'index']);
        Route::patch('/candidatures/{candidature}/status', [CandidatureController::class, 'updateStatus']);
        Route::get('/fonctionnaires/next-matricule', [\App\Http\Controllers\FonctionnaireController::class, 'getNextMatricule']);
        Route::get('/fonctionnaires', [\App\Http\Controllers\FonctionnaireController::class, 'index']);
        Route::get('/fonctionnaires/{id}', [\App\Http\Controllers\FonctionnaireController::class, 'show']);
        Route::post('/fonctionnaires', [\App\Http\Controllers\FonctionnaireController::class, 'store']);
        Route::put('/fonctionnaires/{id}', [\App\Http\Controllers\FonctionnaireController::class, 'update']);
        Route::delete('/fonctionnaires/{id}', [\App\Http\Controllers\FonctionnaireController::class, 'destroy']);
        
        // Leaves and Payroll
        Route::get('/leaves', [\App\Http\Controllers\LeaveRequestController::class, 'index']);
        Route::patch('/leaves/{id}/status', [\App\Http\Controllers\LeaveRequestController::class, 'updateStatus']);
        Route::get('/payrolls', [\App\Http\Controllers\PayrollController::class, 'index']);
        Route::post('/payrolls', [\App\Http\Controllers\PayrollController::class, 'store']);

        // Administrative Acts
        Route::get('/administrative-acts', [AdministrativeActController::class, 'index']);
        Route::post('/administrative-acts/{act}/install', [AdministrativeActController::class, 'install']);
        Route::post('/administrative-acts', [AdministrativeActController::class, 'store']);
        Route::get('/administrative-acts/{act}', [AdministrativeActController::class, 'show']);
        Route::put('/administrative-acts/{act}', [AdministrativeActController::class, 'update']);
        Route::get('/administrative-acts/{act}/pdf', [AdministrativeActController::class, 'generatePdf']);
    });
});
