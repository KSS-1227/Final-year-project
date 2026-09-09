"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckCircle2,
  TrendingUp,
  AlertOctagon,
  ShieldCheck,
  Sliders,
  UploadCloud,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const NAV_ITEMS = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    title: "Data Quality",
    href: "/quality",
    icon: CheckCircle2,
    badge: "M1",
  },
  {
    title: "Forecast",
    href: "/forecast",
    icon: TrendingUp,
    badge: "M2",
  },
  {
    title: "Anomalies",
    href: "/anomalies",
    icon: AlertOctagon,
    badge: "M2",
  },
  {
    title: "Verification",
    href: "/verification",
    icon: ShieldCheck,
    badge: "M3",
  },
  {
    title: "What-If Analysis",
    href: "/what-if",
    icon: Sliders,
    badge: "M3",
  },
  {
    title: "Upload Pipeline",
    href: "/upload",
    icon: UploadCloud,
    badge: "Input",
  },
];

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-800 bg-[#0f172a] text-slate-300 transition-all duration-300 ease-in-out lg:static lg:z-30",
        collapsed ? "w-16" : "w-64",
        mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white font-bold shadow-xs flex-shrink-0">
            <Layers className="h-4.5 w-4.5" />
          </div>
          {(!collapsed || mobileOpen) && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-bold text-white tracking-tight leading-none">
                DecisionHub
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase mt-1">
                Analytics Platform
              </span>
            </div>
          )}
        </div>

        {/* Desktop collapse button */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:ring-1 focus:ring-blue-500"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar (Alt+S)" : "Collapse sidebar (Alt+S)"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Mobile close button */}
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="flex lg:hidden rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav Section Header */}
      {(!collapsed || mobileOpen) && (
        <div className="px-4 pt-5 pb-2 text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
          Modules & Analytics
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-2 py-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-xs font-medium transition-all duration-150 relative outline-none",
                isActive
                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                  : "text-slate-300 hover:bg-slate-800/90 hover:text-white focus-visible:bg-slate-800"
              )}
              title={collapsed && !mobileOpen ? item.title : undefined}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-white rounded-r-sm" />
              )}
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0 transition-colors",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200",
                  (!collapsed || mobileOpen) && "mr-3"
                )}
              />
              {(!collapsed || mobileOpen) && (
                <div className="flex flex-1 items-center justify-between truncate">
                  <span className="truncate">{item.title}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-2 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase leading-none",
                        isActive
                          ? "bg-blue-700 text-blue-100"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer System Role Info */}
      <div className="border-t border-slate-800 p-3 flex-shrink-0">
        {!collapsed || mobileOpen ? (
          <div className="rounded-md bg-slate-900/90 p-2.5 border border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs">
                M3
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-white truncate">Member 3 Engine</span>
                <span className="text-[10px] text-slate-400 truncate">Decision Platform v2.4</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div
              className="flex h-7 w-7 items-center justify-center rounded bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs"
              title="Member 3 - Decision Platform"
            >
              M3
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

