"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { FORECAST_VS_ACTUAL_EVAL } from "@/lib/mock-data/forecast";
import { BarChart3 } from "lucide-react";

export function ForecastVsActualChart() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col h-[380px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Forecast vs. Actual Comparison</h3>
            <p className="text-[11px] text-slate-500">
              Holdout set evaluation: Backtested predictions vs actual ground truth
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          MAPE: 1.15% Avg
        </span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={FORECAST_VS_ACTUAL_EVAL}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              domain={[3000, 4500]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#1e293b",
                color: "#ffffff",
                fontSize: 12,
                borderRadius: 6,
              }}
            />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 12, paddingBottom: 10 }} />
            <Bar dataKey="actual" name="Actual Demand" fill="#0f172a" radius={[3, 3, 0, 0]} />
            <Bar dataKey="forecast" name="Forecast (yhat)" fill="#2563eb" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
