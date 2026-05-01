<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    protected $fillable = [
        'fonctionnaire_id',
        'type',
        'start_date',
        'end_date',
        'status',
        'reason',
    ];

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }
}
