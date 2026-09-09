import React from "react";
import { History, Play } from "lucide-react";
import { ScenarioHistoryRecord } from "@/services/scenario-service";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface ScenarioHistoryTableProps {
  history: ScenarioHistoryRecord[];
  onLoadScenario: (demandChangePercent: number) => void;
}

export function ScenarioHistoryTable({ history, onLoadScenario }: ScenarioHistoryTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-indigo-50 text-indigo-600">
            <History className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Saved Simulation Scenarios (`scenarios`)</h3>
            <p className="text-[11px] text-slate-500">
              Historical scenario runs stored in backend PostgreSQL scenarios database
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Saved Runs: {history.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Scenario Name</th>
              <th className="p-3">Created Date</th>
              <th className="p-3">Demand Change</th>
              <th className="p-3">Projected Demand</th>
              <th className="p-3">Shortage / Surplus</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Load Simulator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {history.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-500">
                  No saved scenarios recorded yet.
                </td>
              </tr>
            ) : (
              history.map((scen) => (
                <tr key={scen.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900 truncate max-w-[200px]">
                    {scen.name}
                  </td>
                  <td className="p-3 text-slate-500 text-[11px] font-mono">{scen.createdAt}</td>
                  <td className="p-3 font-mono font-bold text-indigo-700">
                    {scen.demandChangePercent > 0 ? "+" : ""}
                    {scen.demandChangePercent}%
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-900">
                    {scen.projectedDemand.toLocaleString()} units
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    {scen.shortageSurplus < 0 ? (
                      <span className="font-bold text-rose-700">
                        {Math.abs(scen.shortageSurplus).toLocaleString()} Shortage
                      </span>
                    ) : (
                      <span className="font-bold text-emerald-700">
                        +{scen.shortageSurplus.toLocaleString()} Surplus
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={scen.status} />
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onLoadScenario(scen.demandChangePercent)}
                      className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors shadow-2xs"
                    >
                      <Play className="h-3 w-3" />
                      Run Simulation
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
