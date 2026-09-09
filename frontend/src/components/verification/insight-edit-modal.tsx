"use client";

import React, { useState, useEffect } from "react";
import { X, Edit3, Save } from "lucide-react";
import { DetailedInsight } from "@/services/insight-service";
import { useToast } from "@/components/ui/toast";

interface InsightEditModalProps {
  insight: DetailedInsight | null;
  onClose: () => void;
  onSave: (id: string, newFinding: string) => void;
}

export function InsightEditModal({ insight, onClose, onSave }: InsightEditModalProps) {
  const { success } = useToast();
  const [findingText, setFindingText] = useState(insight?.finding || "");

  useEffect(() => {
    if (insight) {
      setFindingText(insight.finding);
    }
  }, [insight]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (insight) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [insight, onClose]);

  if (!insight) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!findingText.trim()) return;
    onSave(insight.id, findingText);
    success("Insight Updated", `Finding statement updated for ${insight.id}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-lg rounded-md border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Edit3 className="h-4 w-4 text-blue-600" />
            <h3 id="modal-title" className="text-sm font-bold text-slate-900">
              Edit Insight Finding Statement
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-900 focus:ring-1 focus:ring-blue-600"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              Refine Finding Statement ({insight.id}):
            </label>
            <textarea
              rows={4}
              value={findingText}
              onChange={(e) => setFindingText(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 leading-relaxed"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-2xs"
            >
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

