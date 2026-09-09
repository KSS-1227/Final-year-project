"use client";

import { useState, useEffect } from "react";
import { AnomaliesApi } from "@/lib/api/anomalies";
import { AnomalyRecord } from "@/lib/mock-data/anomalies";

export function useAnomalies(
  searchQuery = "",
  severityFilter = "all",
  regionFilter = "all",
  statusFilter = "all"
) {
  const [summary, setSummary] = useState<any>(null);
  const [trend, setTrend] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sRes, tRes, aRes] = await Promise.all([
        AnomaliesApi.getSummary(),
        AnomaliesApi.getTrend(),
        AnomaliesApi.getAnomalies({
          search: searchQuery,
          severity: severityFilter,
          region: regionFilter,
          status: statusFilter,
        }),
      ]);
      setSummary(sRes);
      setTrend(tRes);
      setAnomalies(aRes);
    } catch (err: any) {
      setError(err.message || "Failed to load anomalies data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [searchQuery, severityFilter, regionFilter, statusFilter]);

  return { summary, trend, anomalies, isLoading, error, refresh: fetchAll };
}
