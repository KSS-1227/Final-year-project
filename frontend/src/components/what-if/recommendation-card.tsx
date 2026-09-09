import React from "react";
import { Lightbulb, BookmarkPlus, Download, CheckCircle2, AlertTriangle } from "lucide-react";
import { SimulationResponse } from "@/services/scenario-service";
import { useToast } from "@/components/ui/toast";

interface RecommendationCardProps {
  simulation: SimulationResponse | null;
  onSaveScenario: () => void;
}

export function RecommendationCard({ simulation, onSaveScenario }: RecommendationCardProps) {
  const { success, info } = useToast();

  if (!simulation) return null;

  const hasShortage = simulation.shortage > 0;

  const handleSave = () => {
    onSaveScenario();
    success("Scenario Saved", "Saved current What-If parameter configuration to scenario history.");
  };

  const handleExport = () => {
    info("Report Exported", "Generated scenario impact summary PDF/CSV download.");
  };

  return (
    <div
      className={`rounded-md border p-5 shadow-2xs flex flex-col justify-between h-[380px] ${
        hasShortage
          ? "border-rose-200 bg-rose-50/30"
          : "border-emerald-200 bg-emerald-50/30"
      }`}
    >
      <div>
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded ${
                hasShortage ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Decision Engine Recommendation</h3>
              <p className="text-[11px] text-slate-500">Automated Member 3 Stage 13 scenario insight</p>
            </div>
          </div>
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
              hasShortage ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
            }`}
          >
            {hasShortage ? "Action Suggested" : "Optimal Alignment"}
          </span>
        </div>

        <div className="space-y-4">
          {/* Main Recommendation Statement */}
          <div className="rounded-md bg-white p-4 border border-slate-200 shadow-2xs">
            <div className="flex items-start space-x-3">
              {hasShortage ? (
                <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-xs font-bold text-slate-900">Strategy Directive</h4>
                <p className="text-xs text-slate-800 mt-1 font-medium leading-relaxed">
                  {simulation.recommendation}
                </p>
              </div>
            </div>
          </div>

          {/* Operational Impact Summary */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
              Key Metrics Summary
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-700">
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Baseline vs Target</span>
                <span className="font-mono font-bold text-slate-900">
                  {simulation.baseline_demand.toLocaleString()} → {simulation.projected_demand.toLocaleString()}
                </span>
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Current Inventory</span>
                <span className="font-mono font-bold text-slate-900">
                  {simulation.projected_inventory.toLocaleString()} units
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-2xs focus:ring-1 focus:ring-blue-600"
        >
          <BookmarkPlus className="h-4 w-4" />
          Save Scenario
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors focus:ring-1 focus:ring-blue-600"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}

