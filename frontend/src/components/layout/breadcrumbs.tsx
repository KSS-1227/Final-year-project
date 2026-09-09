"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const ROUTE_NAME_MAP: Record<string, string> = {
  dashboard: "Overview",
  quality: "Data Quality",
  forecast: "Forecast",
  anomalies: "Anomalies",
  verification: "Verification Console",
  "what-if": "What-If Analysis",
  upload: "Data Ingestion Upload",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
      <Link
        href="/dashboard"
        className="flex items-center space-x-1 hover:text-slate-900 transition-colors"
      >
        <Home className="h-3.5 w-3.5 text-slate-400" />
        <span>Platform</span>
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const label = ROUTE_NAME_MAP[segment] || segment.replace(/-/g, " ");

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            {isLast ? (
              <span className="font-semibold text-slate-900 capitalize">{label}</span>
            ) : (
              <Link href={href} className="hover:text-slate-900 transition-colors capitalize">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
