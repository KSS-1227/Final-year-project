import React from "react";
import { AlertOctagon, ShieldAlert, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ANOMALIES_SUMMARY } from "@/lib/mock-data/anomalies";

export function AnomalySummaryCards() {
  const summary = ANOMALIES_SUMMARY;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Anomalies */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Total Anomalies
          </span>
          <AlertOctagon className="h-4 w-4 text-amber-600" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {summary.total}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Flagged by Member 2 engine</p>
      </div>

      {/* Card 2: High / Critical Severity */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            High Severity
          </span>
          <ShieldAlert className="h-4 w-4 text-rose-600" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-rose-700 font-mono">
            {summary.highSeverity}
          </span>
          <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-800">
            Action Required
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Requires immediate review</p>
      </div>

      {/* Card 3: Medium Severity */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Medium Severity
          </span>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {summary.mediumSeverity}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Monitored statistical variance</p>
      </div>

      {/* Card 4: Resolved */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Resolved Anomalies
          </span>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-emerald-700 font-mono">
            {summary.resolved}
          </span>
          <span className="text-xs text-emerald-700 font-semibold">
            {((summary.resolved / summary.total) * 100).toFixed(0)}% Closed
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Verified & closed by team</p>
      </div>
    </div>
  );
}
