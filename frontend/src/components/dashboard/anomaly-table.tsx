import React from "react";
import Link from "next/link";
import { AlertOctagon, ArrowUpRight } from "lucide-react";
import { RECENT_ANOMALIES_5 } from "@/lib/mock-data/dashboard";
import { StatusBadge } from "./status-badge";

export function AnomalyTable() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-rose-50 text-rose-600">
              <AlertOctagon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Anomalies</h3>
              <p className="text-[11px] text-slate-500">Latest 5 statistical anomalies detected</p>
            </div>
          </div>
          <Link
            href="/anomalies"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View All <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="p-2.5">Metric</th>
                <th className="p-2.5">Severity</th>
                <th className="p-2.5">Actual / Expected</th>
                <th className="p-2.5">Detected</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_ANOMALIES_5.map((anom) => (
                <tr key={anom.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-2.5 font-semibold text-slate-900 truncate max-w-[160px]">
                    {anom.metric}
                  </td>
                  <td className="p-2.5">
                    <StatusBadge status={anom.severity} />
                  </td>
                  <td className="p-2.5 font-mono text-[11px]">
                    <span className="font-bold text-slate-900">{anom.actual}</span>
                    <span className="text-slate-400"> / {anom.expected}</span>
                  </td>
                  <td className="p-2.5 text-slate-500 text-[11px]">{anom.detectedAt}</td>
                  <td className="p-2.5 text-right">
                    <StatusBadge status={anom.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
