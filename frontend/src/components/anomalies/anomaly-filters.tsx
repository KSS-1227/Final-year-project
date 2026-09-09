"use client";

import React from "react";
import { Search, Filter, AlertCircle, MapPin, CheckCircle2 } from "lucide-react";

interface AnomalyFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  severityFilter: string;
  setSeverityFilter: (val: string) => void;
  regionFilter: string;
  setRegionFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
}

export function AnomalyFilters({
  searchQuery,
  setSearchQuery,
  severityFilter,
  setSeverityFilter,
  regionFilter,
  setRegionFilter,
  statusFilter,
  setStatusFilter,
}: AnomalyFiltersProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      {/* Search Input */}
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by entity or reason..."
          className="w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Severity Filter */}
        <div className="flex items-center space-x-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
          <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        {/* Region Filter */}
        <div className="flex items-center space-x-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Regions</option>
            <option value="EU-Central">EU-Central</option>
            <option value="APAC-South">APAC-South</option>
            <option value="NA-North">NA-North</option>
            <option value="NA-East">NA-East</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
          <CheckCircle2 className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="INVESTIGATING">Investigating</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>
    </div>
  );
}
