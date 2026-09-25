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
import { AnomalyTrendPoint } from "@/lib/mock-data/anomalies";
import { TrendingUp } from "lucide-react";

interface AnomalyTrendChartProps {
  data: AnomalyTrendPoint[];
}

export function AnomalyTrendChart({ data }: AnomalyTrendChartProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col h-[320px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-amber-50 text-amber-600">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Anomaly Occurrence Trend</h3>
            <p className="text-[11px] text-slate-500">
              Daily frequency breakdown by severity level
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono">Source: `anomalies` table</span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              allowDecimals={false}
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
            <Bar dataKey="critical" name="Critical" stackId="a" fill="#e11d48" />
            <Bar dataKey="high" name="High" stackId="a" fill="#f97316" />
            <Bar dataKey="medium" name="Medium" stackId="a" fill="#f59e0b" />
            <Bar dataKey="low" name="Low" stackId="a" fill="#64748b" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
