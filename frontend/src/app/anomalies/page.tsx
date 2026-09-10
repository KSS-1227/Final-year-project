"use client";

import React, { useState } from "react";
import { useAnomalies } from "@/lib/hooks/useAnomalies";
import { AnomalyRecord } from "@/lib/mock-data/anomalies";
import { AnomalySummaryCards } from "@/components/anomalies/anomaly-summary-cards";
import { AnomalyTrendChart } from "@/components/anomalies/anomaly-trend-chart";
import { AnomalyFilters } from "@/components/anomalies/anomaly-filters";
import { AnomalyTable } from "@/components/anomalies/anomaly-table";
import { AnomalyDetailDrawer } from "@/components/anomalies/anomaly-detail-drawer";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

export default function AnomaliesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAnomaly, setSelectedAnomaly] = useState<AnomalyRecord | null>(null);

  const { anomalies, isLoading, error, refresh } = useAnomalies(
    searchQuery,
    severityFilter,
    regionFilter,
    statusFilter
  );

  if (isLoading) {
    return <LoadingState title="Loading Anomalies & Exceptions" rows={4} />;
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
              Detection Engine
            </span>
            <span className="text-xs text-slate-400">• Consumes `anomalies` REST API</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            Exceptions & Anomalies
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify unusual business activity requiring investigation.
          </p>
        </div>
      </div>

      {/* 2. Summary Cards */}
      <AnomalySummaryCards />

      {/* 3. Trend Chart */}
      <AnomalyTrendChart />

      {/* 6. Filters & Search */}
      <AnomalyFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* 4 & 7. Main Anomaly Table with Sorting */}
      <AnomalyTable
        anomalies={anomalies}
        onSelectAnomaly={(anom) => setSelectedAnomaly(anom)}
      />

      {/* 5. Anomaly Detail Drawer */}
      <AnomalyDetailDrawer
        anomaly={selectedAnomaly}
        onClose={() => setSelectedAnomaly(null)}
      />
    </div>
  );
}
