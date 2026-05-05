<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Administrative Acts pages – Blade Views
Route::middleware(['auth', 'role:rh,rh_admin,admin'])->group(function () {
    Route::get('/actes/recrutement',   fn() => view('actes.recrutement'));
    Route::get('/actes/nomination',    fn() => view('actes.nomination'));
    Route::get('/actes/titularisation',fn() => view('actes.titularisation'));
    Route::get('/actes/notation',      fn() => view('actes.notation'));
    Route::get('/actes/avancement',    fn() => view('actes.avancement'));
    Route::get('/actes/reclassement',  fn() => view('actes.reclassement'));
});
