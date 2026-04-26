<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Employee extends Model
{
    use HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'national_id', 'professional_id', 'first_name', 'last_name', 
        'hire_date', 'status', 'organization_id', 'grade_id', 'echelon_id'
    ];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }

    public function echelon()
    {
        return $this->belongsTo(Echelon::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }
}
