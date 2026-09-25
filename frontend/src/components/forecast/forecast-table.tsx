import React from "react";
import { Table, Download } from "lucide-react";

interface ForecastTableRow {
  date: string;
  entity: string;
  actual: string | number;
  forecast: number;
  variance: string;
}

interface ForecastTableProps {
  data: ForecastTableRow[];
}

export function ForecastTable({ data }: ForecastTableProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Forecast Data Breakdown (`forecasts`)</h3>
          <p className="text-[11px] text-slate-500">
            Granular prediction values by entity and date horizon
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Entity / Dimension</th>
              <th className="p-3">Actual Units</th>
              <th className="p-3">Forecast (yhat)</th>
              <th className="p-3 text-right">Variance Band</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 font-mono font-bold text-slate-900">{row.date}</td>
                <td className="p-3 font-medium text-slate-800">{row.entity}</td>
                <td className="p-3 font-mono text-slate-400">{row.actual}</td>
                <td className="p-3 font-mono font-bold text-blue-700">
                  {row.forecast.toLocaleString()} units
                </td>
                <td className="p-3 text-right font-mono text-slate-500 text-[11px]">
                  <span className="rounded bg-slate-100 px-2 py-0.5">{row.variance} units</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
