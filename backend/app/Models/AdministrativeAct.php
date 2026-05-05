<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdministrativeAct extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'fonctionnaire_id',
        'candidat_id',
        'original_data',
        'new_data',
        'status',
        'created_by',
        'current_version',
        'installed_at'
    ];

    protected $casts = [
        'original_data' => 'array',
        'new_data' => 'array',
        'installed_at' => 'datetime'
    ];

    public function versions(): HasMany
    {
        return $this->hasMany(AdministrativeActVersion::class, 'administrative_act_id')->latest();
    }

    public function fonctionnaire()
    {
        return $this->belongsTo(Fonctionnaire::class);
    }

    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
