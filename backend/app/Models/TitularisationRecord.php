<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TitularisationRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'fonctionnaire_id',
        'administrative_act_id',
        'reference_acte',
        'date_acte',
        'date_effet',
        'date_titularisation',
        'duree_stage',
        'decision_stage',
        'old_grade',
        'old_echelle',
        'old_echelon',
        'old_indice',
        'new_grade',
        'new_echelle',
        'new_echelon',
        'new_indice',
        'service_affectation',
        'lieu_redaction',
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
