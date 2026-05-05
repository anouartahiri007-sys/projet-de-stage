<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReclassementRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'fonctionnaire_id',
        'administrative_act_id',
        'ancien_grade',
        'ancien_echelon',
        'ancien_indice',
        'nouveau_grade',
        'nouvel_echelon',
        'nouvel_indice',
        'date_effet',
        'description_missions',
        'avis_superieur',
        'avis_chef',
        'avis_admin',
        'decision',
        'lieu_redaction',
        'date_redaction',
        'signataire'
    ];

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }

    public function administrativeAct()
    {
        return $this->belongsTo(AdministrativeAct::class);
    }
}
