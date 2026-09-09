import { isMockMode, apiFetch } from "./client";
import {
  ANOMALIES_SUMMARY,
  ANOMALY_TREND_DATA,
  MOCK_ANOMALIES_LIST,
  AnomalyRecord,
} from "@/lib/mock-data/anomalies";

export const AnomaliesApi = {
  async getSummary() {
    if (isMockMode()) {
      return ANOMALIES_SUMMARY;
    }
    return apiFetch<typeof ANOMALIES_SUMMARY>("/api/anomalies/summary");
  },

  async getTrend() {
    if (isMockMode()) {
      return ANOMALY_TREND_DATA;
    }
    return apiFetch<typeof ANOMALY_TREND_DATA>("/api/anomalies/trend");
  },

  async getAnomalies(params?: {
    severity?: string;
    region?: string;
    status?: string;
    search?: string;
  }): Promise<AnomalyRecord[]> {
    if (isMockMode()) {
      let list = [...MOCK_ANOMALIES_LIST];
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (a) => a.entity.toLowerCase().includes(q) || a.reason_short.toLowerCase().includes(q)
        );
      }
      if (params?.severity && params.severity !== "all") {
        list = list.filter((a) => a.severity === params.severity);
      }
      if (params?.region && params.region !== "all") {
        list = list.filter((a) => a.region === params.region);
      }
      if (params?.status && params.status !== "all") {
        list = list.filter((a) => a.status === params.status);
      }
      return list;
    }
    const query = new URLSearchParams(params as any).toString();
    return apiFetch<AnomalyRecord[]>(`/api/anomalies?${query}`);
  },

  async getAnomalyById(id: string): Promise<AnomalyRecord | null> {
    if (isMockMode()) {
      return MOCK_ANOMALIES_LIST.find((a) => a.id === id) || null;
    }
    return apiFetch<AnomalyRecord>(`/api/anomalies/${id}`);
  },
};
