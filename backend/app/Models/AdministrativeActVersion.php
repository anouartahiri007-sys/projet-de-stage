<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AdministrativeActVersion extends Model
{
    protected $fillable = ['administrative_act_id', 'version_number', 'data', 'created_by'];

    protected $casts = [
        'data' => 'array',
    ];

    public function act(): BelongsTo
    {
        return $this->belongsTo(AdministrativeAct::class, 'administrative_act_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
