"use client";

import React, { useState } from "react";
import { useVerification } from "@/lib/hooks/useVerification";
import { DetailedInsight } from "@/services/insight-service";
import { VerificationQueueTable } from "@/components/verification/verification-queue-table";
import { InsightDetailPanel } from "@/components/verification/insight-detail-panel";
import { VerificationHistoryTable } from "@/components/verification/verification-history-table";
import { InsightEditModal } from "@/components/verification/insight-edit-modal";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

export default function VerificationPage() {
  const [editingInsight, setEditingInsight] = useState<DetailedInsight | null>(null);

  const {
    allInsights,
    selectedInsight,
    setSelectedInsight,
    isLoading,
    error,
    refresh,
    approveInsight,
    rejectInsight,
    updateFinding,
    addComment,
  } = useVerification();

  if (isLoading) {
    return <LoadingState title="Loading Verification Workbench" rows={4} />;
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
              Member 3 Core Feature
            </span>
            <span className="text-xs text-slate-400">• PostgreSQL `verified_insights` API</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            Insight Verification
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review high-impact findings before they become trusted business insights.
          </p>
        </div>
      </div>

      {/* 2 & 3. Main Split View: Verification Queue (Left) & Insight Detail Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <VerificationQueueTable
            insights={allInsights}
            selectedId={selectedInsight?.id || null}
            onSelectInsight={(item) => setSelectedInsight(item)}
          />
        </div>
        <div className="lg:col-span-6">
          <InsightDetailPanel
            insight={selectedInsight}
            onApprove={(id, note) => approveInsight(id, note)}
            onReject={(id, note) => rejectInsight(id, note)}
            onEdit={(item) => setEditingInsight(item)}
            onAddComment={(id, text) => addComment(id, text)}
          />
        </div>
      </div>

      {/* 6. Verification History Table */}
      <VerificationHistoryTable
        insights={allInsights}
        onSelectInsight={(item) => setSelectedInsight(item)}
      />

      {/* Edit Statement Modal */}
      <InsightEditModal
        insight={editingInsight}
        onClose={() => setEditingInsight(null)}
        onSave={(id, newFinding) => updateFinding(id, newFinding)}
      />
    </div>
  );
}
