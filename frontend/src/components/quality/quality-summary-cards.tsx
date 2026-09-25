import React from "react";
import { CheckCircle2, ShieldCheck, Database, Check, AlertTriangle } from "lucide-react";
import { QualityMetricSummary } from "@/lib/mock-data/quality";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface QualitySummaryCardsProps {
  data: QualityMetricSummary;
}

export function QualitySummaryCards({ data }: QualitySummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {/* Card 1: Current Quality Score */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Quality Score
          </span>
          <ShieldCheck className="h-4 w-4 text-blue-600" />
        </div>
        <div className="mt-2 flex items-baseline space-x-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {data.currentScore}
          </span>
          <span className="text-xs text-slate-400 font-semibold">/ {data.maxScore}</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Overall evaluation</p>
      </div>

      {/* Card 2: Status */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Status
          </span>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="mt-2">
          <StatusBadge status={data.status} size="md" />
        </div>
        <p className="mt-2 text-[11px] text-slate-500">Target threshold ≥90</p>
      </div>

      {/* Card 3: Total Rows */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Total Rows
          </span>
          <Database className="h-4 w-4 text-slate-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {data.totalRows.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Processed across staging</p>
      </div>

      {/* Card 4: Valid Rows */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Valid Rows
          </span>
          <Check className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-emerald-700 font-mono">
            {data.validRows.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-emerald-700 font-mono">
            {((data.validRows / data.totalRows) * 100).toFixed(1)}%
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Loaded into cleaned tables</p>
      </div>

      {/* Card 5: Rejected Rows */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Rejected Rows
          </span>
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-amber-800 font-mono">
            {data.rejectedRows.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-amber-800 font-mono">
            {((data.rejectedRows / data.totalRows) * 100).toFixed(1)}%
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Quarantined in `rejects`</p>
      </div>
    </div>
  );
}
