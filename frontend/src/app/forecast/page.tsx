"use client";

import React, { useState } from "react";
import { useForecast } from "@/lib/hooks/useForecast";
import { ForecastSummaryCards } from "@/components/forecast/forecast-summary-cards";
import { ForecastFilters } from "@/components/forecast/forecast-filters";
import { ForecastMainChart } from "@/components/forecast/forecast-main-chart";
import { ForecastVsActualChart } from "@/components/forecast/forecast-vs-actual-chart";
import { ModelInfoPanel } from "@/components/forecast/model-info-panel";
import { ForecastTable } from "@/components/forecast/forecast-table";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

export default function ForecastPage() {
  const [dateRange, setDateRange] = useState("28d");
  const [region, setRegion] = useState("all");
  const [sku, setSku] = useState("all");

  const { isLoading, error, refresh } = useForecast(dateRange, region, sku);

  if (isLoading) {
    return <LoadingState title="Loading Predictive Forecast Models" rows={4} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 uppercase">
              Member 2 Forecast Engine
            </span>
            <span className="text-xs text-slate-400">• Consumes Service API Layer</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            Demand Forecast
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive demand analytics, model accuracy evaluation, and confidence interval bounds.
          </p>
        </div>
      </div>

      {/* 2. Forecast Summary Cards */}
      <ForecastSummaryCards />

      {/* 4. Filters Bar */}
      <ForecastFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        region={region}
        setRegion={setRegion}
        sku={sku}
        setSku={setSku}
      />

      {/* 3. Main Forecast Chart */}
      <ForecastMainChart />

      {/* 6 & 7. Forecast vs Actual & Model Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ForecastVsActualChart />
        </div>
        <div className="lg:col-span-1">
          <ModelInfoPanel />
        </div>
      </div>

      {/* 5. Forecast Table */}
      <ForecastTable />
    </div>
  );
}
