import { apiFetch } from "./client";
import {
  ForecastSummaryMetrics,
  ModelMetadata,
  ForecastDataPoint,
  ForecastVsActualPoint,
} from "@/lib/mock-data/forecast";

export const ForecastApi = {
  async getSummary(): Promise<ForecastSummaryMetrics> {
    return apiFetch<ForecastSummaryMetrics>("/api/forecast/summary");
  },

  async getMainTimeseries(params?: { dateRange?: string; region?: string; sku?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return apiFetch<ForecastDataPoint[]>(`/api/forecast/timeseries?${query}`);
  },

  async getForecastVsActual() {
    return apiFetch<ForecastVsActualPoint[]>("/api/forecast/vs-actual");
  },

  async getForecastTable(params?: { dateRange?: string; region?: string; sku?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return apiFetch<any[]>(`/api/forecast/table?${query}`);
  },

  async getModelMetadata(): Promise<ModelMetadata> {
    return apiFetch<ModelMetadata>("/api/forecast/model-info");
  },
};
