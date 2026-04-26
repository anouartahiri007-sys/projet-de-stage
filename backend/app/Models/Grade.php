<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Grade extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'cadre'];

    public function echelons()
    {
        return $this->hasMany(Echelon::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
