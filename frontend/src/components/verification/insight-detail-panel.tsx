"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  MessageSquare,
  ShieldCheck,
  Activity,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";
import { DetailedInsight } from "@/services/insight-service";
import { StatusBadge } from "@/components/dashboard/status-badge";

interface InsightDetailPanelProps {
  insight: DetailedInsight | null;
  onApprove: (id: string, note?: string) => void;
  onReject: (id: string, note?: string) => void;
  onEdit: (insight: DetailedInsight) => void;
  onAddComment: (id: string, text: string) => void;
}

export function InsightDetailPanel({
  insight,
  onApprove,
  onReject,
  onEdit,
  onAddComment,
}: InsightDetailPanelProps) {
  const [commentText, setCommentText] = useState("");
  const [actionNote, setActionNote] = useState("");

  if (!insight) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-xs flex flex-col items-center justify-center h-full min-h-[400px]">
        <ShieldCheck className="h-10 w-10 text-slate-300 mb-3" />
        <h3 className="text-sm font-semibold text-slate-900">Select an Insight to Review</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Click any pending or historical insight from the queue to inspect evidence, append comments, or verify decision status.
        </p>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(insight.id, commentText);
    setCommentText("");
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between space-y-6">
      {/* Header & Status */}
      <div>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold text-slate-500">{insight.id}</span>
            <StatusBadge status={insight.status} />
          </div>
          <span className="text-xs font-mono text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
            Confidence: {insight.confidenceScore}%
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 tracking-tight">{insight.title}</h2>
        <p className="text-xs text-slate-500 mt-0.5">Created {insight.createdAt} • Source: {insight.source}</p>

        {/* Finding Box */}
        <div className="mt-4 rounded-md border border-blue-200 bg-blue-50/50 p-4">
          <div className="flex items-center space-x-1.5 text-blue-900 font-bold text-xs mb-1">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>Finding Statement</span>
          </div>
          <p className="text-xs text-slate-800 font-medium leading-relaxed">{insight.finding}</p>
        </div>

        {/* Evidence Breakdown */}
        <div className="mt-5 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-emerald-600" />
            Supporting Evidence & Root Cause
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="rounded border border-slate-200 bg-slate-50/60 p-2.5">
              <span className="text-[10px] text-slate-500 font-semibold block">Historical Comparison</span>
              <span className="font-bold text-slate-900">{insight.evidence.historicalComparison}</span>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50/60 p-2.5">
              <span className="text-[10px] text-slate-500 font-semibold block">Anomaly Score</span>
              <span className="font-bold text-rose-700 font-mono">{insight.evidence.anomalyScore} / 5.0</span>
            </div>
            <div className="rounded sm:col-span-2 border border-slate-200 bg-slate-50/60 p-2.5">
              <span className="text-[10px] text-slate-500 font-semibold block">Relevant Operational KPI</span>
              <span className="font-mono font-bold text-blue-700">{insight.evidence.relevantKPI}</span>
            </div>
          </div>

          <div className="rounded border border-slate-200 p-3 bg-white text-xs">
            <span className="text-[10px] text-slate-500 font-bold uppercase block mb-1">Root Cause</span>
            <p className="text-slate-700 leading-relaxed">{insight.evidence.rootCause}</p>
          </div>
        </div>

        {/* Review Notes Input */}
        {insight.status === "PENDING" && (
          <div className="mt-4">
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Verification Review Note (Optional)
            </label>
            <input
              type="text"
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
              placeholder="e.g. Approved based on Q3 carrier trend correlation..."
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
          {insight.status === "PENDING" ? (
            <>
              <button
                onClick={() => onApprove(insight.id, actionNote)}
                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <CheckCircle2 className="h-4 w-4" />
                Approve Insight
              </button>
              <button
                onClick={() => onReject(insight.id, actionNote)}
                className="inline-flex items-center gap-1.5 rounded-md bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-rose-700 transition-colors shadow-xs"
              >
                <XCircle className="h-4 w-4" />
                Reject Insight
              </button>
              <button
                onClick={() => onEdit(insight)}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5 text-slate-600" />
                Edit Statement
              </button>
            </>
          ) : (
            <div className="flex items-center justify-between w-full text-xs">
              <span className="text-slate-500 font-medium">
                Verified by <strong className="text-slate-800">{insight.verifiedBy || "System"}</strong> on {insight.verifiedAt}
              </span>
              <button
                onClick={() => onEdit(insight)}
                className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                Edit Finding
              </button>
            </div>
          )}
        </div>

        {/* Comments Feed & Add Comment */}
        <div className="mt-6 border-t border-slate-100 pt-4 space-y-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            Verification Review Audit Feed ({insight.comments.length})
          </h4>

          <div className="space-y-2 max-h-40 overflow-y-auto">
            {insight.comments.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No review notes posted yet.</p>
            ) : (
              insight.comments.map((c) => (
                <div key={c.id} className="rounded bg-slate-50 p-2.5 border border-slate-200/80 text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[10px] mb-1">
                    <span className="font-bold text-slate-800">{c.author}</span>
                    <span>{c.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-snug">{c.text}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2 pt-1">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add review comment..."
              className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <Send className="h-3 w-3" />
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
