<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id', 'from_grade_id', 'to_grade_id', 
        'from_echelon_id', 'to_echelon_id', 'effective_date', 'type'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
