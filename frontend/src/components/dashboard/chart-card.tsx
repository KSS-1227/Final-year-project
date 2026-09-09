"use client";

import React, { useState } from "react";
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
import { PERFORMANCE_CHART_DATA } from "@/lib/mock-data/dashboard";
import { LineChart, Filter } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-slate-200 bg-slate-900 text-white p-3 text-xs shadow-lg space-y-1">
        <p className="font-semibold border-b border-slate-800 pb-1 text-slate-300">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center justify-between space-x-4">
            <span style={{ color: entry.color }} className="font-medium">
              {entry.name}:
            </span>
            <span className="font-mono font-bold">₹{entry.value}M</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function ChartCard() {
  const [timeframe, setTimeframe] = useState<"3M" | "6M" | "ALL">("6M");

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col h-[400px]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-100 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
            <LineChart className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Business Performance</h3>
            <p className="text-[11px] text-slate-500">
              Actual vs. Forecasted Revenue (₹ Millions) with predictive trend projection
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1 rounded-md border border-slate-200 bg-slate-50 p-0.5 text-[11px] font-medium text-slate-600">
          <button
            onClick={() => setTimeframe("3M")}
            className={`rounded px-2.5 py-1 transition-colors ${
              timeframe === "3M" ? "bg-white text-slate-900 font-bold shadow-2xs" : "hover:text-slate-900"
            }`}
          >
            3M
          </button>
          <button
            onClick={() => setTimeframe("6M")}
            className={`rounded px-2.5 py-1 transition-colors ${
              timeframe === "6M" ? "bg-white text-slate-900 font-bold shadow-2xs" : "hover:text-slate-900"
            }`}
          >
            6M
          </button>
          <button
            onClick={() => setTimeframe("ALL")}
            className={`rounded px-2.5 py-1 transition-colors ${
              timeframe === "ALL" ? "bg-white text-slate-900 font-bold shadow-2xs" : "hover:text-slate-900"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={PERFORMANCE_CHART_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
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
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `₹${val}M`}
              domain={[6, 16]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual Revenue"
              stroke="#2563eb"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#actualGradient)"
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="Forecasted Revenue"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3, fill: "#64748b" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
