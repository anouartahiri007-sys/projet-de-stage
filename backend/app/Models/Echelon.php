<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Echelon extends Model
{
    use HasFactory;

    protected $fillable = ['grade_id', 'level', 'index_value', 'months_required'];

    public function grade()
    {
        return $this->belongsTo(Grade::class);
    }
}
