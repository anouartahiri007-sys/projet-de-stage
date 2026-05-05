<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NominationRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'fonctionnaire_id',
        'administrative_act_id',
        'acte_reference',
        'date_decision',
        'date_effet',
        'date_prise_service',
        'nouveau_grade',
        'nouvel_echelon',
        'indice',
        'poste',
        'service',
        'type_nomination',
        'articles_extra'
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
