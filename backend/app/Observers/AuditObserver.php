<?php

namespace App\Observers;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

class AuditObserver
{
    public function created($model)
    {
        $this->logActivity($model, 'created');
    }

    public function updated($model)
    {
        $this->logActivity($model, 'updated');
    }

    public function deleted($model)
    {
        $this->logActivity($model, 'deleted');
    }

    protected function logActivity($model, $action)
    {
        AuditLog::create([
            'user_id' => Auth::id(),
            'action' => $action,
            'entity_type' => get_class($model),
            'entity_id' => $model->id,
            'old_values' => $action === 'updated' ? array_intersect_key($model->getOriginal(), $model->getChanges()) : null,
            'new_values' => $action === 'updated' ? $model->getChanges() : $model->toArray(),
        ]);
    }
}
