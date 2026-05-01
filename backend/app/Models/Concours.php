<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Concours extends Model
{
    protected $fillable = [
        'title',
        'description',
        'positions_available',
        'publication_date',
        'closing_date',
        'status',
    ];

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }
}
