import { isMockMode, apiFetch } from "./client";
import { DASHBOARD_KPIS, PERFORMANCE_CHART_DATA, RECENT_ANOMALIES_5, RECENT_BATCHES_5, KPIItem } from "@/lib/mock-data/dashboard";

export const DashboardApi = {
  async getKPIs(): Promise<KPIItem[]> {
    if (isMockMode()) {
      return DASHBOARD_KPIS;
    }
    return apiFetch<KPIItem[]>("/api/dashboard/kpis");
  },

  async getPerformanceData() {
    if (isMockMode()) {
      return PERFORMANCE_CHART_DATA;
    }
    return apiFetch<typeof PERFORMANCE_CHART_DATA>("/api/dashboard/performance");
  },

  async getRecentAnomalies() {
    if (isMockMode()) {
      return RECENT_ANOMALIES_5;
    }
    return apiFetch<typeof RECENT_ANOMALIES_5>("/api/dashboard/recent-anomalies");
  },

  async getRecentBatches() {
    if (isMockMode()) {
      return RECENT_BATCHES_5;
    }
    return apiFetch<typeof RECENT_BATCHES_5>("/api/dashboard/recent-batches");
  },
};
