"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ShieldCheck, AlertTriangle, ArrowRight, Activity, FileText } from "lucide-react";
import { AnomalyRecord } from "@/lib/mock-data/anomalies";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { useToast } from "@/components/ui/toast";

interface AnomalyDetailDrawerProps {
  anomaly: AnomalyRecord | null;
  onClose: () => void;
}

export function AnomalyDetailDrawer({ anomaly, onClose }: AnomalyDetailDrawerProps) {
  const { success } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (anomaly) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [anomaly, onClose]);

  if (!anomaly) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs animate-in fade-in-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10" onClick={(e) => e.stopPropagation()}>
        <div className="w-screen max-w-lg bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex-shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <StatusBadge status={anomaly.severity} />
                <span className="font-mono text-xs text-slate-500 font-semibold">{anomaly.id}</span>
              </div>
              <button
                onClick={onClose}
                className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-colors focus:ring-1 focus:ring-blue-600"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <h2 id="drawer-title" className="text-lg font-bold text-slate-900 tracking-tight">{anomaly.entity}</h2>
            <div className="flex items-center space-x-3 mt-2 text-xs text-slate-500 font-medium">
              <span>Region: <strong className="text-slate-700">{anomaly.region}</strong></span>
              <span>•</span>
              <span>{anomaly.timestamp}</span>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* Score & Status Highlight */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-md border border-slate-200">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Anomaly Score</span>
                <p className="text-xl font-extrabold text-rose-700 mt-0.5 font-mono">
                  {anomaly.score} <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                </p>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase">Investigation Status</span>
                <div className="mt-1">
                  <StatusBadge status={anomaly.status} size="md" />
                </div>
              </div>
            </div>

            {/* Why was it flagged? */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Why was it flagged?
              </h4>
              <p className="text-slate-800 bg-amber-50/60 border border-amber-200/80 p-3 rounded text-xs font-medium leading-relaxed">
                {anomaly.reason_short}
              </p>
            </div>

            {/* Root Cause Notes */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <FileText className="h-4 w-4 text-blue-600" />
                Root Cause Analysis
              </h4>
              <div className="rounded-md border border-slate-200 bg-white p-3.5 leading-relaxed text-slate-700">
                {anomaly.root_cause_notes}
              </div>
            </div>

            {/* Statistical Evidence */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Activity className="h-4 w-4 text-emerald-600" />
                Statistical Evidence
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded border border-slate-200 p-2.5 bg-slate-50/50">
                  <span className="text-[10px] text-slate-500 font-semibold block">Actual Value</span>
                  <span className="font-bold text-rose-700 font-mono text-sm">{anomaly.evidence.actualValue}</span>
                </div>
                <div className="rounded border border-slate-200 p-2.5 bg-slate-50/50">
                  <span className="text-[10px] text-slate-500 font-semibold block">Expected Value</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">{anomaly.evidence.expectedValue}</span>
                </div>
                <div className="rounded border border-slate-200 p-2.5 bg-slate-50/50">
                  <span className="text-[10px] text-slate-500 font-semibold block">Deviation</span>
                  <span className="font-bold text-rose-700 font-mono">{anomaly.evidence.deviationPercent}</span>
                </div>
                <div className="rounded border border-slate-200 p-2.5 bg-slate-50/50">
                  <span className="text-[10px] text-slate-500 font-semibold block">Z-Score Score</span>
                  <span className="font-bold text-slate-900 font-mono">{anomaly.evidence.zScore}</span>
                </div>
              </div>
            </div>

            {/* Related Metrics */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Related Operational Metrics
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {anomaly.related_metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 border border-slate-200"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Footer Action Buttons */}
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-shrink-0">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <Link
              href="/verification"
              onClick={() => success("Navigating to Verification Console", `Inspecting ${anomaly.id}`)}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-2xs"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify Insight in Console
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

