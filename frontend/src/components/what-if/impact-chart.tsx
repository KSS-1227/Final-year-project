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
import { SimulationResponse } from "@/services/scenario-service";
import { BarChart2 } from "lucide-react";

interface ImpactChartProps {
  simulation: SimulationResponse | null;
}

export function ImpactChart({ simulation }: ImpactChartProps) {
  if (!simulation) return null;

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col h-[380px]">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-indigo-50 text-indigo-600">
            <BarChart2 className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Simulated Demand Impact vs Baseline</h3>
            <p className="text-[11px] text-slate-500">
              Comparative projection: Baseline Demand vs. Simulated Scenario
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
          Delta: {simulation.demand_change > 0 ? "+" : ""}{(simulation.demand_change * 100).toFixed(0)}%
        </span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={simulation.impact_timeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={{ stroke: "#e2e8f0" }}
              tickLine={false}
            />
            <YAxis
              domain={[6000, 18000]}
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
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
            <Bar dataKey="baseline" name="Baseline Demand" fill="#94a3b8" radius={[3, 3, 0, 0]} />
            <Bar dataKey="simulated" name="Simulated Demand" fill="#4f46e5" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
