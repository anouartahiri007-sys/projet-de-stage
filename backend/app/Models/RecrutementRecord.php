<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecrutementRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidat_id',
        'fonctionnaire_id',
        'administrative_act_id',
        'reference_acte',
        'date_acte',
        'date_recrutement',
        'grade_recrutement',
        'echelle_recrutement',
        'echelon_recrutement',
        'indice_recrutement',
        'service_affectation',
        'type_recrutement',
        'diplome',
        'specialite',
        'date_diplome',
        'date_effet',
        'num_telegramme',
        'date_telegramme',
        'lieu_redaction',
        'signataire'
    ];

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }

    public function administrativeAct()
    {
        return $this->belongsTo(AdministrativeAct::class);
    }
}
