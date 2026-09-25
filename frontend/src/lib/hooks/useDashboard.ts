"use client";

import { useState, useEffect } from "react";
import { DashboardApi } from "@/lib/api/dashboard";
import { KPIItem, PerformanceDataPoint, DashboardAnomaly, DashboardBatch, KeyInsightItem } from "@/lib/mock-data/dashboard";

export function useDashboard() {
  const [kpis, setKpis] = useState<KPIItem[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([]);
  const [recentAnomalies, setRecentAnomalies] = useState<DashboardAnomaly[]>([]);
  const [recentBatches, setRecentBatches] = useState<DashboardBatch[]>([]);
  const [keyInsights, setKeyInsights] = useState<KeyInsightItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [kRes, pRes, aRes, bRes, iRes] = await Promise.all([
        DashboardApi.getKPIs(),
        DashboardApi.getPerformanceData(),
        DashboardApi.getRecentAnomalies(),
        DashboardApi.getRecentBatches(),
        DashboardApi.getKeyInsights(),
      ]);
      setKpis(kRes);
      setPerformanceData(pRes);
      setRecentAnomalies(aRes);
      setRecentBatches(bRes);
      setKeyInsights(iRes);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { kpis, performanceData, recentAnomalies, recentBatches, keyInsights, isLoading, error, refresh: fetchAll };
}
