<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fonctionnaire extends Model
{
    protected $fillable = [
        'user_id',
        'candidat_id',
        'matricule',
        'grade',
        'recruitment_date',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }
}
