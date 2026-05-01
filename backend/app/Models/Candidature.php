<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    protected $fillable = [
        'candidat_id',
        'concours_id',
        'status',
        'notes'
    ];

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }

    public function concours()
    {
        return $this->belongsTo(Concours::class);
    }
}
