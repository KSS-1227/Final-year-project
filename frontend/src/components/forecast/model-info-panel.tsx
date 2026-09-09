import React from "react";
import { Cpu, CheckCircle2, Sliders, Shield } from "lucide-react";
import { MODEL_METADATA } from "@/lib/mock-data/forecast";

export function ModelInfoPanel() {
  const model = MODEL_METADATA;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between h-[380px]">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-50 text-purple-600">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Member 2 Model Registry</h3>
              <p className="text-[11px] text-slate-500">Read-only ML model configuration metadata</p>
            </div>
          </div>
          <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800 font-mono">
            {model.version}
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 font-medium">Model Architecture:</span>
            <span className="font-bold text-slate-900 font-mono">{model.algorithm}</span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500 font-medium">Training Date:</span>
            <span className="font-mono text-slate-700">{model.trainedAt}</span>
          </div>

          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200 text-center font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">MAE Error</span>
              <span className="font-bold text-slate-900">{model.mae}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">MAPE Error</span>
              <span className="font-bold text-blue-700">{model.mape}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">R² Accuracy</span>
              <span className="font-bold text-emerald-700">{model.r2Score}</span>
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">
              Features & Covariates Used:
            </span>
            <div className="flex flex-wrap gap-1">
              {model.featuresUsed.map((feat) => (
                <span
                  key={feat}
                  className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-700 border border-slate-200"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-emerald-600" />
          Model trained & managed by Member 2
        </span>
        <span className="font-mono">PostgreSQL `model_runs`</span>
      </div>
    </div>
  );
}
