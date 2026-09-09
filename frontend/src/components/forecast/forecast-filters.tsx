"use client";

import React from "react";
import { Filter, Calendar, MapPin, Package } from "lucide-react";

interface ForecastFiltersProps {
  dateRange: string;
  setDateRange: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  sku: string;
  setSku: (val: string) => void;
}

export function ForecastFilters({
  dateRange,
  setDateRange,
  region,
  setRegion,
  sku,
  setSku,
}: ForecastFiltersProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-blue-600" />
        <span className="text-xs font-bold text-slate-900">Forecast Parameters & Filters</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Date Range Selector */}
        <div className="flex items-center space-x-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="28d">Next 28 Days</option>
            <option value="60d">Next 60 Days</option>
            <option value="90d">Next 90 Days</option>
          </select>
        </div>

        {/* Region Selector */}
        <div className="flex items-center space-x-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Regions</option>
            <option value="na-east">North America (NA-East)</option>
            <option value="eu-central">Europe (EU-Central)</option>
            <option value="apac-south">APAC (APAC-South)</option>
          </select>
        </div>

        {/* SKU Selector */}
        <div className="flex items-center space-x-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs">
          <Package className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All SKUs</option>
            <option value="sku-1092">SKU-1092 Enterprise SaaS</option>
            <option value="sku-2048">SKU-2048 Logistics Core</option>
          </select>
        </div>
      </div>
    </div>
  );
}
