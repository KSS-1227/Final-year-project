import React from "react";
import { AlertTriangle } from "lucide-react";
import { RejectedRecordSummary } from "@/lib/mock-data/quality";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface RejectsTableProps {
  data: RejectedRecordSummary[];
}

export function RejectsTable({ data }: RejectsTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-50 text-amber-600">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Quarantined Records (`rejects`)</h3>
            <p className="text-[11px] text-slate-500">
              Categorized summary of rejected rows during schema validation & cleaning
            </p>
          </div>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
          {data.reduce((sum, r) => sum + r.count, 0).toLocaleString()} Total Rejects
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Rejection Reason</th>
              <th className="p-3">Count</th>
              <th className="p-3">Percentage</th>
              <th className="p-3">Sample Value</th>
              <th className="p-3 text-right">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {data.map((rej) => (
              <tr key={rej.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 font-semibold text-slate-900">{rej.reason}</td>
                <td className="p-3 font-mono font-bold text-slate-900">{rej.count.toLocaleString()}</td>
                <td className="p-3 font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-amber-800">{rej.percentage}%</span>
                    <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${rej.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="p-3 font-mono text-slate-500 text-[11px] max-w-xs truncate">
                  {rej.sampleValue}
                </td>
                <td className="p-3 text-right">
                  <StatusBadge status={rej.severity} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
