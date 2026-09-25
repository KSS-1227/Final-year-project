"use client";

import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useDashboard } from "@/lib/hooks/useDashboard";
import { KPICard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { AnomalyTable } from "@/components/dashboard/anomaly-table";
import { BatchTable } from "@/components/dashboard/batch-table";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

export default function DashboardPage() {
  const { kpis, performanceData, recentAnomalies, recentBatches, keyInsights, isLoading, error, refresh } = useDashboard();
  const [lastRefreshed, setLastRefreshed] = useState("Sep 09, 2026 • 17:30 IST");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    const now = new Date();
    const formatted =
      now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }) +
      " • " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }) +
      " IST";
    setLastRefreshed(formatted);
    setIsRefreshing(false);
  };

  if (isLoading) {
    return <LoadingState title="Loading Executive Intelligence" rows={5} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRefresh} />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/90 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Enterprise Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Business performance, data quality and predictive insights
          </p>
        </div>

        {/* Timestamp & Refresh Button */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-slate-500 font-medium">
            Last updated: <span className="font-mono text-slate-700 font-semibold">{lastRefreshed}</span>
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-blue-600 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* 2. KPI Row (5 cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} item={kpi} />
        ))}
      </div>

      {/* 3. Power BI-Style Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Business Performance Chart (2x size) */}
        <div className="lg:col-span-2">
          <ChartCard data={performanceData} />
        </div>

        {/* Key Insights Panel (1x size) */}
        <div className="lg:col-span-1">
          <InsightCard insights={keyInsights} />
        </div>
      </div>

      {/* 4. Bottom Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnomalyTable anomalies={recentAnomalies} />
        <BatchTable batches={recentBatches} />
      </div>

      {/* 5. Quick Actions */}
      <QuickActionCard />
    </div>
  );
}
