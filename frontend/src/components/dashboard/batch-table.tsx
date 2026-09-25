import React from "react";
import Link from "next/link";
import { Database, ArrowUpRight } from "lucide-react";
import { DashboardBatch } from "@/lib/mock-data/dashboard";
import { StatusBadge } from "./status-badge";

interface BatchTableProps {
  batches: DashboardBatch[];
}

export function BatchTable({ batches }: BatchTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Data Batches</h3>
              <p className="text-[11px] text-slate-500">Ingestion pipeline execution logs</p>
            </div>
          </div>
          <Link
            href="/quality"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            View Quality Catalog <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="p-2.5">Batch ID</th>
                <th className="p-2.5">Uploaded</th>
                <th className="p-2.5">Row Count</th>
                <th className="p-2.5">Quality Score</th>
                <th className="p-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {batches.map((batch) => (
                <tr key={batch.batchId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-2.5 font-mono font-bold text-slate-900">{batch.batchId}</td>
                  <td className="p-2.5 text-slate-500 text-[11px]">{batch.uploadDate}</td>
                  <td className="p-2.5 font-mono text-slate-700">
                    {batch.rowCount.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-mono">
                    <span
                      className={`font-bold ${
                        batch.qualityScore >= 90
                          ? "text-emerald-700"
                          : batch.qualityScore >= 80
                          ? "text-amber-700"
                          : "text-rose-700"
                      }`}
                    >
                      {batch.qualityScore}%
                    </span>
                  </td>
                  <td className="p-2.5 text-right">
                    <StatusBadge status={batch.status} />
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
