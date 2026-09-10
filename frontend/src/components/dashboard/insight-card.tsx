import React from "react";
import { Lightbulb, CheckCircle2, AlertOctagon, TrendingUp, ShieldCheck } from "lucide-react";
import { KEY_INSIGHTS, KeyInsightItem } from "@/lib/mock-data/dashboard";
import { StatusBadge } from "./status-badge";

export function InsightCard() {
  const getInsightIcon = (category: KeyInsightItem["category"]) => {
    switch (category) {
      case "revenue":
        return <TrendingUp className="h-4 w-4 text-emerald-600 flex-shrink-0" />;
      case "anomaly":
        return <AlertOctagon className="h-4 w-4 text-amber-600 flex-shrink-0" />;
      case "forecast":
        return <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />;
      case "quality":
        return <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />;
      default:
        return <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0" />;
    }
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between h-[400px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-50 text-amber-600">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Key Insights</h3>
              <p className="text-[11px] text-slate-500">Automated decision intelligence highlights</p>
            </div>
          </div>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
            Real-time
          </span>
        </div>

        {/* Insight Items List */}
        <div className="space-y-3">
          {KEY_INSIGHTS.map((insight) => (
            <div
              key={insight.id}
              className="rounded-md border border-slate-100 bg-slate-50/60 p-3 hover:bg-slate-50 hover:border-slate-200 transition-colors flex items-start space-x-3 text-xs"
            >
              <div className="mt-0.5">{getInsightIcon(insight.category)}</div>
              <p className="text-slate-800 font-medium leading-snug">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Verified automatically</span>
        <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
          Explore Insights &rarr;
        </span>
      </div>
    </div>
  );
}
