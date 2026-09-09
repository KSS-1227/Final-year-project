"use client";

import { useState, useEffect } from "react";
import { DashboardApi } from "@/lib/api/dashboard";
import { KPIItem } from "@/lib/mock-data/dashboard";

export function useDashboard() {
  const [kpis, setKpis] = useState<KPIItem[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [recentAnomalies, setRecentAnomalies] = useState<any[]>([]);
  const [recentBatches, setRecentBatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [kRes, pRes, aRes, bRes] = await Promise.all([
        DashboardApi.getKPIs(),
        DashboardApi.getPerformanceData(),
        DashboardApi.getRecentAnomalies(),
        DashboardApi.getRecentBatches(),
      ]);
      setKpis(kRes);
      setPerformanceData(pRes);
      setRecentAnomalies(aRes);
      setRecentBatches(bRes);
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { kpis, performanceData, recentAnomalies, recentBatches, isLoading, error, refresh: fetchAll };
}
