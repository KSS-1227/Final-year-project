"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { QUALITY_TREND_DATA } from "@/lib/mock-data/quality";
import { TrendingUp } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border border-slate-200 bg-slate-900 text-white p-3 text-xs shadow-lg space-y-1">
        <p className="font-semibold text-slate-300 border-b border-slate-800 pb-1">
          {label} ({data.batchId})
        </p>
        <div className="flex items-center justify-between space-x-4">
          <span className="text-slate-400">Quality Score:</span>
          <span className="font-mono font-bold text-blue-400">{data.score}%</span>
        </div>
        <div className="flex items-center justify-between space-x-4 text-[11px]">
          <span className="text-slate-400">Target Threshold:</span>
          <span className="font-mono text-emerald-400">{data.target}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export function QualityTrendChart() {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Data Quality Score Trend</h3>
            <p className="text-[11px] text-slate-500">
              Historical evaluation scores across recent batch ingestion runs
            </p>
          </div>
        </div>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-600">
          Target: ≥90%
        </span>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={QUALITY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              domain={[50, 100]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={90} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target 90%', fill: '#10b981', fontSize: 10, position: 'insideTopRight' }} />
            <Line
              type="monotone"
              dataKey="score"
              name="Quality Score"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#2563eb", strokeWidth: 2, stroke: "#ffffff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
