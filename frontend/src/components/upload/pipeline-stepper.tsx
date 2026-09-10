import React from "react";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import { UploadPipelineStep } from "@/services/upload-service";

interface PipelineStepperProps {
  steps: UploadPipelineStep[];
}

export function PipelineStepper({ steps }: PipelineStepperProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Ingestion Pipeline Tracker</h3>
          <p className="text-[11px] text-slate-500">
            Real-time execution status across staging, validation, cleaning, and scoring
          </p>
        </div>
        <span className="text-xs text-blue-600 font-mono font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          7 Pipeline Stages
        </span>
      </div>

      {/* Stepper Grid / List */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isDone = step.status === "COMPLETED";
          const isCurrent = step.status === "IN_PROGRESS";
          const isWaiting = step.status === "WAITING";

          return (
            <div
              key={step.stepNumber}
              className={`flex items-start space-x-3.5 p-3 rounded-md border text-xs transition-all ${
                isDone
                  ? "bg-emerald-50/40 border-emerald-200/80"
                  : isCurrent
                  ? "bg-blue-50/60 border-blue-200 shadow-2xs"
                  : "bg-slate-50/40 border-slate-100 opacity-60"
              }`}
            >
              {/* Icon Status */}
              <div className="flex-shrink-0 mt-0.5">
                {isDone && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                {isCurrent && <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />}
                {isWaiting && <Clock className="h-4 w-4 text-slate-400" />}
              </div>

              {/* Step Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-bold ${
                      isDone
                        ? "text-emerald-900"
                        : isCurrent
                        ? "text-blue-900"
                        : "text-slate-600"
                    }`}
                  >
                    Step {step.stepNumber}: {step.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase rounded px-1.5 py-0.5 ${
                      isDone
                        ? "bg-emerald-100 text-emerald-800"
                        : isCurrent
                        ? "bg-blue-100 text-blue-800 animate-pulse"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
