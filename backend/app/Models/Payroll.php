<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'fonctionnaire_id',
        'base_salary',
        'bonuses',
        'deductions',
        'net_salary',
        'payment_date',
        'status',
    ];

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}
