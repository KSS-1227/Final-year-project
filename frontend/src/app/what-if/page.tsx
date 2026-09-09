"use client";

import React, { useState } from "react";
import { useScenario } from "@/lib/hooks/useScenario";
import { ScenarioControlPanel } from "@/components/what-if/scenario-control-panel";
import { ScenarioSummaryCards } from "@/components/what-if/scenario-summary-cards";
import { ImpactChart } from "@/components/what-if/impact-chart";
import { RecommendationCard } from "@/components/what-if/recommendation-card";
import { ScenarioHistoryTable } from "@/components/what-if/scenario-history-table";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";

export default function WhatIfPage() {
  const [demandChangePercent, setDemandChangePercent] = useState<number>(20);
  const { simulation, history, isSimulating, isLoadingHistory, error, saveCurrentScenario } =
    useScenario(demandChangePercent);

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-800 uppercase">
              Member 3 Stage 13 Simulation Engine
            </span>
            <span className="text-xs text-slate-400">• Consumes `POST /api/scenarios/simulate`</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            What-If Analysis
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Simulate decision variables and evaluate projected operational impacts.
          </p>
        </div>
      </div>

      {/* 2. Scenario Control Panel Slider */}
      <ScenarioControlPanel
        demandChangePercent={demandChangePercent}
        onChangeDemandChange={(val) => setDemandChangePercent(val)}
        isSimulating={isSimulating}
        onReset={() => setDemandChangePercent(0)}
      />

      {/* 3. Scenario Summary Cards */}
      <ScenarioSummaryCards simulation={simulation} />

      {/* 4 & 5. Impact Chart & Recommendation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImpactChart simulation={simulation} />
        </div>
        <div className="lg:col-span-1">
          <RecommendationCard
            simulation={simulation}
            onSaveScenario={saveCurrentScenario}
          />
        </div>
      </div>

      {/* 6. Scenario History Table */}
      {isLoadingHistory ? (
        <LoadingState title="Loading Saved Scenarios" rows={2} />
      ) : (
        <ScenarioHistoryTable
          history={history}
          onLoadScenario={(val) => setDemandChangePercent(val)}
        />
      )}
    </div>
  );
}
