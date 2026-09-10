import React from "react";
import { ShieldCheck, Eye, History } from "lucide-react";
import { DetailedInsight } from "@/services/insight-service";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface VerificationHistoryTableProps {
  insights: DetailedInsight[];
  onSelectInsight: (insight: DetailedInsight) => void;
}

export function VerificationHistoryTable({
  insights,
  onSelectInsight,
}: VerificationHistoryTableProps) {
  const historyItems = insights.filter((i) => i.status !== "PENDING");

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-50 text-emerald-600">
            <History className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Verified Insights Audit History (`verified_insights`)
            </h3>
            <p className="text-[11px] text-slate-500">
              Historical record of insights approved, edited, or rejected by domain experts
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Total Decision Records: {historyItems.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Insight ID</th>
              <th className="p-3">Decision Status</th>
              <th className="p-3">Insight Title</th>
              <th className="p-3">Verified By</th>
              <th className="p-3">Verified Date</th>
              <th className="p-3 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {historyItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  No historical verification logs recorded yet.
                </td>
              </tr>
            ) : (
              historyItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => onSelectInsight(item)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-slate-900">{item.id}</td>
                  <td className="p-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-3 font-semibold text-slate-900 truncate max-w-[240px]">
                    {item.title}
                  </td>
                  <td className="p-3 text-slate-700 font-medium">{item.verifiedBy || "System"}</td>
                  <td className="p-3 text-slate-500 text-[11px] font-mono">{item.verifiedAt}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectInsight(item);
                      }}
                      className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Eye className="h-3 w-3" />
                      View
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
