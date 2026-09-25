import React from "react";
import { Calendar, Target, ShoppingBag, TrendingUp } from "lucide-react";
import { ForecastSummaryMetrics } from "@/lib/mock-data/forecast";

interface ForecastSummaryCardsProps {
  data: ForecastSummaryMetrics;
}

export function ForecastSummaryCards({ data }: ForecastSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Forecast Horizon */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Forecast Horizon
          </span>
          <Calendar className="h-4 w-4 text-blue-600" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {data.horizon}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Active projection window</p>
      </div>

      {/* Card 2: Forecast Accuracy */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Forecast Accuracy
          </span>
          <Target className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {data.accuracy}%
          </span>
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
            R² 0.948
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">MAPE: 3.12% across validation set</p>
      </div>

      {/* Card 3: Expected Demand */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Expected Demand
          </span>
          <ShoppingBag className="h-4 w-4 text-blue-600" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {data.expectedDemand.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Units predicted for period</p>
      </div>

      {/* Card 4: Trend */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Trend
          </span>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-emerald-700">
            +{data.trend}%
          </span>
          <span className="text-xs text-emerald-700 font-semibold">Positive Growth</span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Projected demand trajectory</p>
      </div>
    </div>
  );
}
