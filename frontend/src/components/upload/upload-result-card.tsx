import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, LayoutDashboard, ArrowRight, FileSpreadsheet } from "lucide-react";
import { UploadBatchResult } from "@/services/upload-service";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface UploadResultCardProps {
  result: UploadBatchResult;
  onUploadAnother: () => void;
}

export function UploadResultCard({ result, onUploadAnother }: UploadResultCardProps) {
  return (
    <div className="rounded-md border border-emerald-200 bg-white p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Ingestion Pipeline Completed</h3>
            <p className="text-xs text-slate-500">
              Batch <span className="font-mono text-slate-700 font-semibold">{result.batchId}</span> successfully processed at {result.completedAt}
            </p>
          </div>
        </div>
        <StatusBadge status={result.status} size="md" />
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-md bg-slate-50 p-3.5 border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Batch ID</span>
          <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">{result.batchId}</span>
        </div>

        <div className="rounded-md bg-slate-50 p-3.5 border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Rows Processed</span>
          <span className="text-base font-bold text-slate-900 font-mono mt-0.5 block">
            {result.rowsProcessed.toLocaleString()}
          </span>
        </div>

        <div className="rounded-md bg-slate-50 p-3.5 border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Rows Rejected</span>
          <span className="text-base font-bold text-amber-800 font-mono mt-0.5 block">
            {result.rowsRejected.toLocaleString()}
          </span>
        </div>

        <div className="rounded-md bg-slate-50 p-3.5 border border-slate-200">
          <span className="text-[10px] font-semibold text-slate-500 uppercase block">Quality Score</span>
          <span className="text-base font-bold text-emerald-700 font-mono mt-0.5 block">
            {result.qualityScore}%
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={onUploadAnother}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Upload Another File
        </button>

        <div className="flex items-center space-x-2">
          <Link
            href="/quality"
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            View Data Quality
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
          >
            <LayoutDashboard className="h-4 w-4" />
            Open Dashboard
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
