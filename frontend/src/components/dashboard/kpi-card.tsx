import React from "react";
import {
  ShieldCheck,
  IndianRupee,
  Package,
  AlertOctagon,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { KPIItem } from "@/lib/mock-data/dashboard";
import { StatusBadge } from "./status-badge";

const ICON_MAP = {
  quality: ShieldCheck,
  revenue: IndianRupee,
  units: Package,
  anomalies: AlertOctagon,
  accuracy: Target,
};

export function KPICard({ item }: { item: KPIItem }) {
  const IconComponent = ICON_MAP[item.iconName] || Target;

  const isUp = item.trendDirection === "up";
  const isDown = item.trendDirection === "down";

  // Check if positive (e.g., revenue up is positive, anomalies down is positive)
  const isPositive = item.trendPositive ?? isUp;

  return (
    <div className="group rounded-md border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between h-full">
      {/* Top Title & Icon / Badge Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <IconComponent className="h-3.5 w-3.5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {item.title}
          </span>
        </div>
        {item.statusBadge && (
          <StatusBadge status={item.statusBadge.text} size="sm" />
        )}
      </div>

      {/* Main Metric Value & Trend Row */}
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
          {item.value}
        </span>

        {item.trend && (
          <div
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold ${
              isPositive
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                : "bg-rose-50 text-rose-800 border border-rose-200/60"
            }`}
          >
            {isUp && <TrendingUp className="mr-1 h-3 w-3" />}
            {isDown && <TrendingDown className="mr-1 h-3 w-3" />}
            {!isUp && !isDown && <Minus className="mr-1 h-3 w-3" />}
            <span>{item.trend}</span>
          </div>
        )}
      </div>

      {/* Supporting Text */}
      <p className="mt-2 text-[11px] text-slate-500 truncate border-t border-slate-100 pt-2">
        {item.supportingText}
      </p>
    </div>
  );
}

