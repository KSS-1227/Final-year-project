import React from "react";
import { ShoppingBag, TrendingUp, Package, AlertTriangle, CheckCircle2 } from "lucide-react";
import { SimulationResponse } from "@/services/scenario-service";

interface ScenarioSummaryCardsProps {
  simulation: SimulationResponse | null;
}

export function ScenarioSummaryCards({ simulation }: ScenarioSummaryCardsProps) {
  if (!simulation) return null;

  const hasShortage = simulation.shortage > 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {/* Card 1: Current Demand */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Current Demand
          </span>
          <ShoppingBag className="h-4 w-4 text-slate-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {simulation.baseline_demand.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Baseline historical units</p>
      </div>

      {/* Card 2: Demand Change */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Demand Change
          </span>
          <TrendingUp className="h-4 w-4 text-indigo-600" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-indigo-700 font-mono">
            {simulation.demand_change > 0 ? "+" : ""}
            {(simulation.demand_change * 100).toFixed(0)}%
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Simulated shift rate</p>
      </div>

      {/* Card 3: Projected Demand */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Projected Demand
          </span>
          <ShoppingBag className="h-4 w-4 text-indigo-600" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {simulation.projected_demand.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Simulated target units</p>
      </div>

      {/* Card 4: Available Inventory */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            Available Inventory
          </span>
          <Package className="h-4 w-4 text-slate-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
            {simulation.projected_inventory.toLocaleString()}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">Warehouse stock on hand</p>
      </div>

      {/* Card 5: Projected Shortage / Surplus */}
      <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
            {hasShortage ? "Projected Shortage" : "Inventory Status"}
          </span>
          {hasShortage ? (
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          ) : (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          )}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span
            className={`text-2xl font-bold tracking-tight font-mono ${
              hasShortage ? "text-rose-700" : "text-emerald-700"
            }`}
          >
            {hasShortage ? simulation.shortage.toLocaleString() : "Sufficient"}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">
          {hasShortage ? "Stockout deficit risk" : "Stock meets demand"}
        </p>
      </div>
    </div>
  );
}
