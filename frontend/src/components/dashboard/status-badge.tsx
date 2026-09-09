import React from "react";
import { cn } from "@/lib/utils";

export type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "COMPLETED"
  | "PROCESSING"
  | "FAILED"
  | "PENDING"
  | "OPEN"
  | "INVESTIGATING"
  | "RESOLVED";

interface StatusBadgeProps {
  status: StatusVariant | string;
  size?: "sm" | "md";
  showDot?: boolean;
  className?: string;
}

export function StatusBadge({ status, size = "sm", showDot = true, className }: StatusBadgeProps) {
  const upper = status.toUpperCase();

  let badgeStyles = "bg-slate-100 text-slate-700 border-slate-200";
  let dotColor = "bg-slate-500";

  if (["PASS", "PASSED", "SUCCESS", "COMPLETED", "RESOLVED", "POSITIVE", "OPTIMAL"].includes(upper)) {
    badgeStyles = "bg-emerald-50 text-emerald-800 border-emerald-200/80";
    dotColor = "bg-emerald-500";
  } else if (["WARNING", "PROCESSING", "PENDING", "INVESTIGATING", "MEDIUM", "MODERATE"].includes(upper)) {
    badgeStyles = "bg-amber-50 text-amber-900 border-amber-200/80";
    dotColor = "bg-amber-500";
  } else if (["FAIL", "FAILED", "DANGER", "CRITICAL", "HIGH", "OPEN", "SEVERE"].includes(upper)) {
    badgeStyles = "bg-rose-50 text-rose-800 border-rose-200/80";
    dotColor = "bg-rose-500";
  } else if (["INFO", "NEUTRAL", "LOW"].includes(upper)) {
    badgeStyles = "bg-slate-100 text-slate-700 border-slate-200";
    dotColor = "bg-slate-400";
  } else if (["RUNNING", "ACTIVE"].includes(upper)) {
    badgeStyles = "bg-blue-50 text-blue-800 border-blue-200/80";
    dotColor = "bg-blue-500";
  }

  const sizeStyles = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md font-semibold tracking-wide border uppercase leading-none transition-colors",
        badgeStyles,
        sizeStyles,
        className
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0", dotColor)} />}
      <span>{status}</span>
    </span>
  );
}

