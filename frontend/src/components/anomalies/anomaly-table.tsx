"use client";

import React, { useState } from "react";
import { ArrowUpDown, Eye, AlertOctagon } from "lucide-react";
import { AnomalyRecord } from "@/lib/mock-data/anomalies";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface AnomalyTableProps {
  anomalies: AnomalyRecord[];
  onSelectAnomaly: (anomaly: AnomalyRecord) => void;
}

type SortField = "score" | "timestamp" | "severity";

export function AnomalyTable({ anomalies, onSelectAnomaly }: AnomalyTableProps) {
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedAnomalies = [...anomalies].sort((a, b) => {
    if (sortField === "score") {
      return sortOrder === "asc" ? a.score - b.score : b.score - a.score;
    }
    if (sortField === "timestamp") {
      return sortOrder === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return 0;
  });

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Detected Anomalies (`anomalies`)</h3>
          <p className="text-[11px] text-slate-500">
            List of statistical deviations identified across business dimensions
          </p>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Showing {sortedAnomalies.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Severity</th>
              <th className="p-3">Entity</th>
              <th className="p-3 cursor-pointer select-none" onClick={() => toggleSort("timestamp")}>
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3 cursor-pointer select-none" onClick={() => toggleSort("score")}>
                <div className="flex items-center space-x-1">
                  <span>Score</span>
                  <ArrowUpDown className="h-3 w-3 text-slate-400" />
                </div>
              </th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {sortedAnomalies.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-500">
                  No anomalies match the selected filters.
                </td>
              </tr>
            ) : (
              sortedAnomalies.map((anom) => (
                <tr
                  key={anom.id}
                  onClick={() => onSelectAnomaly(anom)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="p-3">
                    <StatusBadge status={anom.severity} />
                  </td>
                  <td className="p-3 font-semibold text-slate-900 truncate max-w-[180px]">
                    {anom.entity}
                  </td>
                  <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">
                    {anom.timestamp}
                  </td>
                  <td className="p-3 font-mono font-bold text-rose-700">{anom.score}</td>
                  <td className="p-3 text-slate-600 max-w-xs truncate">{anom.reason_short}</td>
                  <td className="p-3">
                    <StatusBadge status={anom.status} />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAnomaly(anom);
                      }}
                      className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-2xs"
                    >
                      <Eye className="h-3 w-3" />
                      Inspect
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
