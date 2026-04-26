import React from 'react'
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react'

interface WorkflowStep {
  name: string
  label: string
  status: 'completed' | 'current' | 'upcoming' | 'error'
  date?: string
}

interface WorkflowVisualizerProps {
  steps: WorkflowStep[]
}

const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ steps }) => {
  return (
    <div className="py-6">
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 -z-0"></div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex items-start">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                {step.status === 'completed' && (
                  <div className="bg-healthcare-600 rounded-full p-0.5 text-white">
                    <CheckCircle2 size={24} />
                  </div>
                )}
                {step.status === 'current' && (
                  <div className="bg-white border-2 border-primary-600 rounded-full p-1 text-primary-600 animate-pulse">
                    <Clock size={18} />
                  </div>
                )}
                {step.status === 'upcoming' && (
                  <div className="bg-white border-2 border-slate-200 rounded-full p-1 text-slate-300">
                    <Circle size={18} />
                  </div>
                )}
                {step.status === 'error' && (
                  <div className="bg-error-600 rounded-full p-0.5 text-white">
                    <AlertCircle size={24} />
                  </div>
                )}
              </div>
              <div className="ml-4">
                <p className={`text-sm font-bold ${step.status === 'current' ? 'text-primary-600' : 'text-primary-900'}`}>
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-slate-400 mt-1">{step.date}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkflowVisualizer
