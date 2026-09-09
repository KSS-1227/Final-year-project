import React from "react";
import { QUALITY_SUMMARY_DATA, QUALITY_COMPONENTS_DATA } from "@/lib/mock-data/quality";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { CheckCircle2 } from "lucide-react";

export function QualityGauge() {
  const summary = QUALITY_SUMMARY_DATA;
  const components = QUALITY_COMPONENTS_DATA;

  // SVG Gauge calculations
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (summary.currentScore / 100) * circumference;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-sm font-bold text-slate-900">Quality Score Evaluation</h3>
          <StatusBadge status={summary.status} />
        </div>

        {/* Circular Gauge Centerpiece */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative flex items-center justify-center">
            <svg className="h-40 w-40 transform -rotate-90">
              {/* Background Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-blue-600 transition-all duration-1000 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {summary.currentScore}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">out of {summary.maxScore}</span>
              <span className="mt-1 rounded bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                {summary.status}
              </span>
            </div>
          </div>
        </div>

        {/* Component Scores Progress Bars */}
        <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-4">
          {components.map((comp) => (
            <div key={comp.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{comp.name}</span>
                <div className="flex items-center space-x-1.5">
                  <span className="font-mono font-bold text-slate-900">{comp.score}%</span>
                  <span className="text-[10px] text-slate-400 font-mono">(Tgt: {comp.target}%)</span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    comp.score >= comp.target ? "bg-emerald-600" : "bg-amber-500"
                  }`}
                  style={{ width: `${comp.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[10px] text-slate-400 text-center border-t border-slate-100 pt-3">
        Evaluated automatically during Member 1 staging pipeline execution
      </p>
    </div>
  );
}
