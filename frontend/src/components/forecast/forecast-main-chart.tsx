"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ForecastDataPoint } from "@/lib/mock-data/forecast";
import { TrendingUp } from "lucide-react";

interface ForecastMainChartProps {
  data: ForecastDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-slate-200 bg-slate-900 text-white p-3 text-xs shadow-lg space-y-1">
        <p className="font-semibold border-b border-slate-800 pb-1 text-slate-300">{label}</p>
        {payload.map((entry: any, index: number) => {
          if (entry.dataKey === "yhat_lower") return null;
          if (entry.dataKey === "yhat_upper") {
            const lower = entry.payload.yhat_lower;
            return (
              <div key={`ci-${index}`} className="flex items-center justify-between space-x-4 text-[11px] text-slate-400">
                <span>95% Confidence Band:</span>
                <span className="font-mono">{lower?.toLocaleString()} - {entry.value?.toLocaleString()}</span>
              </div>
            );
          }
          return (
            <div key={`item-${index}`} className="flex items-center justify-between space-x-4">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-mono font-bold">{entry.value?.toLocaleString()} units</span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export function ForecastMainChart({ data }: ForecastMainChartProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col h-[420px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Demand Forecast Trajectory</h3>
            <p className="text-[11px] text-slate-500">
              Historical actual units vs. Prophet + XGBoost ensemble forecast (`yhat`) with 95% confidence band
            </p>
          </div>
        </div>
        <span className="rounded bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-100 font-mono">
          yhat ± 95% CI
        </span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="ciBandGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              domain={[9000, 15000]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
            />
            {/* Upper Confidence Band Area */}
            <Area
              type="monotone"
              dataKey="yhat_upper"
              name="Upper Confidence (95%)"
              stroke="transparent"
              fill="url(#ciBandGradient)"
            />
            {/* Historical Actual Line */}
            <Line
              type="monotone"
              dataKey="actual"
              name="Historical Actual"
              stroke="#0f172a"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#0f172a" }}
            />
            {/* Forecast Line yhat */}
            <Line
              type="monotone"
              dataKey="yhat"
              name="Forecast (yhat)"
              stroke="#2563eb"
              strokeWidth={2.5}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: "#2563eb" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
