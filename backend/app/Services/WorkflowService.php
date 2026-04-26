<?php

namespace App\Services;

use App\Models\WorkflowInstance;
use App\Models\WorkflowLog;
use App\Models\Employee;
use App\Notifications\PromotionApproved;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class WorkflowService
{
    protected $definitions = [
        'promotion' => [
            'states' => ['initiated', 'regional_review', 'provincial_approval', 'ministry_finalization', 'realized'],
            'transitions' => [
                'submit' => ['from' => 'initiated', 'to' => 'regional_review', 'role' => 'Hospital Admin'],
                'regional_approve' => ['from' => 'regional_review', 'to' => 'provincial_approval', 'role' => 'Regional Admin'],
                'provincial_approve' => ['from' => 'provincial_approval', 'to' => 'ministry_finalization', 'role' => 'Provincial Delegate'],
                'finalize' => ['from' => 'ministry_finalization', 'to' => 'realized', 'role' => 'Ministry Admin'],
                'reject' => ['from' => '*', 'to' => 'rejected', 'role' => 'Admin'],
            ]
        ],
        'titularisation' => [
            'states' => ['probation', 'evaluating', 'confirmed', 'terminated'],
            'transitions' => [
                'start_eval' => ['from' => 'probation', 'to' => 'evaluating', 'role' => 'Hospital Admin'],
                'confirm' => ['from' => 'evaluating', 'to' => 'confirmed', 'role' => 'Hospital Director'],
            ]
        ]
    ];

    public function transition(WorkflowInstance $instance, $transitionName, $comment = null)
    {
        $definition = $this->definitions[$instance->workflow_name] ?? null;
        if (!$definition) throw new \Exception("Workflow definition not found");

        $transition = $definition['transitions'][$transitionName] ?? null;
        if (!$transition) throw new \Exception("Invalid transition");

        if ($transition['from'] !== '*' && $transition['from'] !== $instance->current_state) {
            throw new \Exception("Transition not allowed from current state");
        }

        // Logic check: Here we would check user roles/permissions
        // For now, simplicity:
        $oldState = $instance->current_state;
        $instance->update(['current_state' => $transition['to']]);

        WorkflowLog::create([
            'instance_id' => $instance->id,
            'from_state' => $oldState,
            'to_state' => $transition['to'],
            'transition' => $transitionName,
            'user_id' => Auth::id(),
            'comment' => $comment
        ]);

        // Event Hook: Notification on promotion realization
        if ($instance->workflow_name === 'promotion' && $transition['to'] === 'realized') {
            $employee = Employee::find($instance->entity_id);
            if ($employee) {
                $employee->notify(new PromotionApproved([
                    'employee_name' => "{$employee->first_name} {$employee->last_name}",
                    'to_grade' => $employee->grade->name
                ]));
            }
        }

        return $instance;
    }

    public function startWorkflow($workflowName, $entity)
    {
        $definition = $this->definitions[$workflowName] ?? null;
        if (!$definition) throw new \Exception("Workflow definition not found");

        return WorkflowInstance::create([
            'workflow_name' => $workflowName,
            'current_state' => $definition['states'][0],
            'entity_type' => get_class($entity),
            'entity_id' => $entity->id
        ]);
    }
}
