import React from "react";
import { FileSpreadsheet, Eye, Download } from "lucide-react";
import { QUALITY_BATCH_HISTORY } from "@/lib/mock-data/quality";
import { StatusBadge } from "@/components/dashboard/status-badge";

export function BatchHistoryTable() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Ingested Batch History (`batches`)</h3>
          <p className="text-[11px] text-slate-500">
            Historical batch processing logs and quality evaluation scores
          </p>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Total Batches: {QUALITY_BATCH_HISTORY.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Batch ID</th>
              <th className="p-3">File Name</th>
              <th className="p-3">Uploaded</th>
              <th className="p-3">Rows</th>
              <th className="p-3">Quality Score</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {QUALITY_BATCH_HISTORY.map((batch) => (
              <tr key={batch.batchId} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 font-mono font-bold text-slate-900">{batch.batchId}</td>
                <td className="p-3 font-medium flex items-center space-x-2">
                  <FileSpreadsheet className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="truncate max-w-[220px]">{batch.fileName}</span>
                </td>
                <td className="p-3 text-slate-500 text-[11px]">{batch.uploadedAt}</td>
                <td className="p-3 font-mono">{batch.rowCount.toLocaleString()}</td>
                <td className="p-3 font-mono">
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
                <td className="p-3">
                  <StatusBadge status={batch.status} />
                </td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      className="rounded border border-slate-200 bg-white p-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      title="Inspect Batch Logs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="rounded border border-slate-200 bg-white p-1 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      title="Download Audit Log"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
