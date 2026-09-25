import { apiFetch } from "./client";
import { KPIItem, PerformanceDataPoint, DashboardAnomaly, DashboardBatch, KeyInsightItem } from "@/lib/mock-data/dashboard";

export const DashboardApi = {
  async getKPIs(): Promise<KPIItem[]> {
    return apiFetch<KPIItem[]>("/api/dashboard/kpis");
  },

  async getPerformanceData() {
    return apiFetch<PerformanceDataPoint[]>("/api/dashboard/performance");
  },

  async getRecentAnomalies() {
    return apiFetch<DashboardAnomaly[]>("/api/dashboard/recent-anomalies");
  },

  async getRecentBatches() {
    return apiFetch<DashboardBatch[]>("/api/dashboard/recent-batches");
  },

  async getKeyInsights() {
    return apiFetch<KeyInsightItem[]>("/api/dashboard/insights");
  },
};
