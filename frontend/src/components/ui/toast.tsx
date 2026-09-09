"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, "id">) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type = "info" }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev.slice(-4), { id, title, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, message?: string) => showToast({ title, message, type: "success" }),
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string) => showToast({ title, message, type: "error" }),
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string) => showToast({ title, message, type: "info" }),
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string) => showToast({ title, message, type: "warning" }),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => {
          const Icon =
            toast.type === "success"
              ? CheckCircle2
              : toast.type === "error"
              ? AlertCircle
              : toast.type === "warning"
              ? AlertTriangle
              : Info;

          const borderBg =
            toast.type === "success"
              ? "bg-white border-emerald-200 text-emerald-900 shadow-sm"
              : toast.type === "error"
              ? "bg-white border-rose-200 text-rose-900 shadow-sm"
              : toast.type === "warning"
              ? "bg-white border-amber-200 text-amber-900 shadow-sm"
              : "bg-white border-slate-200 text-slate-900 shadow-sm";

          const iconColor =
            toast.type === "success"
              ? "text-emerald-600"
              : toast.type === "error"
              ? "text-rose-600"
              : toast.type === "warning"
              ? "text-amber-600"
              : "text-blue-600";

          return (
            <div
              key={toast.id}
              className={cn(
                "pointer-events-auto flex items-start space-x-3 rounded-md border p-3.5 transition-all duration-200 animate-in slide-in-from-bottom-3",
                borderBg
              )}
            >
              <Icon className={cn("h-4 w-4 flex-shrink-0 mt-0.5", iconColor)} />
              <div className="flex-1 text-xs">
                <p className="font-semibold text-slate-900">{toast.title}</p>
                {toast.message && <p className="mt-0.5 text-slate-600 leading-normal">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 rounded p-0.5"
                aria-label="Dismiss toast"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
