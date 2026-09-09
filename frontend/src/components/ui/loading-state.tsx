import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
  rows?: number;
}

export function LoadingState({
  title = "Loading analytics...",
  description = "Fetching verified metrics and model pipeline states.",
  rows = 3,
}: LoadingStateProps) {
  return (
    <div className="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="animate-pulse flex space-x-4">
            <div className="h-10 bg-slate-100 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
