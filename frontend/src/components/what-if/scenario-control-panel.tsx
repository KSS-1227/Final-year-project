"use client";

import React from "react";
import { Sliders, RotateCcw } from "lucide-react";

interface ScenarioControlPanelProps {
  demandChangePercent: number;
  onChangeDemandChange: (val: number) => void;
  isSimulating: boolean;
  onReset: () => void;
}

export function ScenarioControlPanel({
  demandChangePercent,
  onChangeDemandChange,
  isSimulating,
  onReset,
}: ScenarioControlPanelProps) {
  const presets = [-10, 0, 10, 20, 35, 50];

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-indigo-50 text-indigo-600">
            <Sliders className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Scenario Control Panel</h3>
            <p className="text-[11px] text-slate-500">
              Modify decision variables to simulate operational outcomes in real time
            </p>
          </div>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-2xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Baseline
        </button>
      </div>

      {/* Primary Variable Slider */}
      <div className="space-y-4 max-w-2xl mx-auto py-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
            Primary Decision Variable: Demand Change
          </span>
          <div className="flex items-center space-x-2">
            {isSimulating && (
              <span className="text-[10px] text-indigo-600 font-semibold animate-pulse">
                Simulating...
              </span>
            )}
            <span
              className={`font-mono text-sm font-extrabold px-2.5 py-0.5 rounded border ${
                demandChangePercent > 0
                  ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                  : demandChangePercent < 0
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {demandChangePercent > 0 ? "+" : ""}
              {demandChangePercent}%
            </span>
          </div>
        </div>

        {/* Range Input Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={-20}
            max={50}
            step={1}
            value={demandChangePercent}
            onChange={(e) => onChangeDemandChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>-20%</span>
            <span>0% (Baseline)</span>
            <span>+20%</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center space-x-2 pt-2">
          <span className="text-[11px] font-semibold text-slate-500">Quick Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((val) => (
              <button
                key={val}
                onClick={() => onChangeDemandChange(val)}
                className={`rounded px-2.5 py-1 text-xs font-mono transition-all ${
                  demandChangePercent === val
                    ? "bg-indigo-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {val > 0 ? `+${val}%` : `${val}%`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
