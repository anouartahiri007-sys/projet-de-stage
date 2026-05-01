<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidat extends Model
{
    protected $fillable = [
        'user_id',
        'cin',
        'first_name',
        'last_name',
        'phone',
        'birth_date',
        'address'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }
}
