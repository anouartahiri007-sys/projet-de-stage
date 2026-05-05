<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fonctionnaire extends Model
{
    protected $appends = ['grade_actuel', 'echelon_actuel', 'date_recrutement'];

    protected $fillable = [
        'user_id',
        'candidat_id',
        'matricule',
        'grade',
        'specialty',
        'echelon',
        'rank_degree',
        'recruitment_date',
        'status',
        'nom',
        'prenom',
        'cnie',
        'date_naissance',
        'lieu_naissance',
        'situation_familiale',
        'nombre_enfants',
        'poste',
        'adresse',
        'telephone',
        'date_grade',
        'date_echelon',
        'direction',
        'sexe',
        'nom_ar',
        'prenom_ar',
        'lieu_naissance_ar',
        'email_perso'
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'recruitment_date' => 'date',
        'date_recrutement' => 'date',
        'date_grade' => 'date',
        'date_echelon' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }

    // Accessor for backward compatibility with blade templates using date_recrutement
    public function getDateRecrutementAttribute()
    {
        return $this->recruitment_date;
    }

    // Mocking gradeActuel and echelonActuel if tables don't exist yet
    public function getGradeActuelAttribute()
    {
        return (object) ['intitule' => $this->grade];
    }

    public function getEchelonActuelAttribute()
    {
        return (object) ['numero' => $this->echelon];
    }
}
