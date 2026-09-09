import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Failed to load data",
  message = "An error occurred while connecting to the decision pipeline API.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-md border border-rose-200 bg-rose-50/50 p-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 rounded-full bg-rose-100 p-2 text-rose-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-rose-900">{title}</h3>
          <p className="mt-1 text-xs text-rose-700">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded bg-rose-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-700 transition-colors shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry Connection
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
