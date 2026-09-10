import React from "react";
import Link from "next/link";
import { UploadCloud, AlertOctagon, TrendingUp, Sliders, Zap } from "lucide-react";

export function QuickActionCard() {
  const actions = [
    {
      title: "Upload Data",
      description: "Trigger data cleaning & scoring",
      href: "/upload",
      icon: UploadCloud,
      color: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    },
    {
      title: "View Anomalies",
      description: "Review 18 flagged data deviations",
      href: "/anomalies",
      icon: AlertOctagon,
      color: "bg-amber-50 text-amber-800 hover:bg-amber-100 border-amber-200",
    },
    {
      title: "View Forecast",
      description: "Inspect 90-day predictive trends",
      href: "/forecast",
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200",
    },
    {
      title: "Run What-If",
      description: "Simulate pricing & budget scenarios",
      href: "/what-if",
      icon: Sliders,
      color: "bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border-indigo-200",
    },
  ];

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-50 text-blue-600">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Decision Quick Actions</h3>
          <p className="text-[11px] text-slate-500">Fast workflows for executive operations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <Link
              key={act.title}
              href={act.href}
              className={`rounded-md border p-3.5 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs ${act.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold">{act.title}</span>
                <Icon className="h-4 w-4 opacity-80" />
              </div>
              <p className="text-[11px] opacity-75 font-normal">{act.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
