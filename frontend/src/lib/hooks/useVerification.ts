"use client";

import { useState, useEffect } from "react";
import { VerificationApi } from "@/lib/api/verification";
import { DetailedInsight } from "@/services/insight-service";

export function useVerification() {
  const [allInsights, setAllInsights] = useState<DetailedInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<DetailedInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await VerificationApi.getAllInsights();
      setAllInsights(data);
      if (data.length > 0 && !selectedInsight) {
        setSelectedInsight(data[0]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load verification insights");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const approveInsight = async (id: string, note?: string) => {
    const updated = await VerificationApi.approveInsight(id, "System", note);
    setSelectedInsight(updated);
    await fetchAll();
  };

  const rejectInsight = async (id: string, note?: string) => {
    const updated = await VerificationApi.rejectInsight(id, "System", note);
    setSelectedInsight(updated);
    await fetchAll();
  };

  const updateFinding = async (id: string, newFinding: string) => {
    const updated = await VerificationApi.updateInsightFinding(id, newFinding, "System");
    setSelectedInsight(updated);
    await fetchAll();
  };

  const addComment = async (id: string, text: string) => {
    const updated = await VerificationApi.addInsightComment(id, "System", text);
    setSelectedInsight(updated);
    await fetchAll();
  };

  return {
    allInsights,
    selectedInsight,
    setSelectedInsight,
    isLoading,
    error,
    refresh: fetchAll,
    approveInsight,
    rejectInsight,
    updateFinding,
    addComment,
  };
}
