import React from "react";
import { ShieldCheck, Eye, Clock } from "lucide-react";
import { DetailedInsight } from "@/services/insight-service";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface VerificationQueueTableProps {
  insights: DetailedInsight[];
  selectedId: string | null;
  onSelectInsight: (insight: DetailedInsight) => void;
}

export function VerificationQueueTable({
  insights,
  selectedId,
  onSelectInsight,
}: VerificationQueueTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Pending Verification Queue</h3>
              <p className="text-[11px] text-slate-500">
                Insights requiring Member 3 review before publishing to decision dashboard
              </p>
            </div>
          </div>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
            {insights.filter((i) => i.status === "PENDING").length} Pending
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="p-3">Status</th>
                <th className="p-3">Insight Title</th>
                <th className="p-3">Source Engine</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {insights.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No pending insights in verification queue.
                  </td>
                </tr>
              ) : (
                insights.map((item) => {
                  const isSelected = selectedId === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectInsight(item)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-blue-50/70 border-l-2 border-l-blue-600 font-medium"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      <td className="p-3">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="p-3 font-semibold text-slate-900 truncate max-w-[200px]">
                        {item.title}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-slate-600">{item.source}</td>
                      <td className="p-3">
                        <StatusBadge status={item.severity} />
                      </td>
                      <td className="p-3 font-mono font-bold text-blue-700">
                        {item.confidenceScore}%
                      </td>
                      <td className="p-3 text-slate-500 text-[11px] whitespace-nowrap">
                        {item.createdAt}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectInsight(item);
                          }}
                          className={`inline-flex items-center gap-1 rounded border px-2.5 py-1 text-[11px] font-semibold transition-colors shadow-2xs ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <Eye className="h-3 w-3" />
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
