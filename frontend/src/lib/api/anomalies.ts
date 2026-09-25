import { apiFetch } from "./client";
import { AnomalyRecord, AnomalyTrendPoint } from "@/lib/mock-data/anomalies";

export interface AnomalySummary {
  total: number;
  highSeverity: number;
  mediumSeverity: number;
  resolved: number;
}

export const AnomaliesApi = {
  async getSummary() {
    return apiFetch<AnomalySummary>("/api/anomalies/summary");
  },

  async getTrend() {
    return apiFetch<AnomalyTrendPoint[]>("/api/anomalies/trend");
  },

  async getAnomalies(params?: {
    severity?: string;
    region?: string;
    status?: string;
    search?: string;
  }): Promise<AnomalyRecord[]> {
    const query = new URLSearchParams(params as any).toString();
    return apiFetch<AnomalyRecord[]>(`/api/anomalies?${query}`);
  },

  async getAnomalyById(id: string): Promise<AnomalyRecord | null> {
    return apiFetch<AnomalyRecord>(`/api/anomalies/${id}`);
  },
};
