<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    protected $fillable = [
        'fonctionnaire_id',
        'medecin_id',
        'type',
        'description',
        'attachment_path',
        'record_date',
    ];

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }

    public function medecin()
    {
        return $this->belongsTo(User::class, 'medecin_id');
    }
}
