"use client";

import React, { useState } from "react";
import { useQuality } from "@/lib/hooks/useQuality";
import { QualitySummaryCards } from "@/components/quality/quality-summary-cards";
import { QualityGauge } from "@/components/quality/quality-gauge";
import { QualityTrendChart } from "@/components/quality/quality-trend-chart";
import { BatchHistoryTable } from "@/components/quality/batch-history-table";
import { RejectsTable } from "@/components/quality/rejects-table";
import { SchemaMetadataTable } from "@/components/quality/schema-metadata-table";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

type QualityTab = "overview" | "batches" | "rejects" | "schema";

export default function QualityPage() {
  const [activeTab, setActiveTab] = useState<QualityTab>("overview");
  const { isLoading, error, refresh } = useQuality();

  if (isLoading) {
    return <LoadingState title="Loading Quality Catalog Metrics" rows={4} />;
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
              Output Visualization
            </span>
            <span className="text-xs text-slate-400">• Service Layer Contract</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">Data Quality</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor the quality and reliability of uploaded datasets.
          </p>
        </div>
      </div>

      {/* 2. Quality Summary Row */}
      <QualitySummaryCards />

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("batches")}
          className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "batches"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Batch History
        </button>
        <button
          onClick={() => setActiveTab("rejects")}
          className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "rejects"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Rejected Records
        </button>
        <button
          onClick={() => setActiveTab("schema")}
          className={`pb-2.5 text-xs font-bold border-b-2 transition-colors ${
            activeTab === "schema"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          Schema (`metadata_catalog`)
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <QualityGauge />
          </div>
          <div className="lg:col-span-2">
            <QualityTrendChart />
          </div>
        </div>
      )}

      {activeTab === "batches" && <BatchHistoryTable />}
      {activeTab === "rejects" && <RejectsTable />}
      {activeTab === "schema" && <SchemaMetadataTable />}
    </div>
  );
}
