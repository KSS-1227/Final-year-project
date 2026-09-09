import { isMockMode, apiFetch } from "./client";
import {
  FORECAST_SUMMARY,
  MAIN_FORECAST_TIMESERIES,
  FORECAST_VS_ACTUAL_EVAL,
  FORECAST_TABLE_DATA,
  MODEL_METADATA,
  ForecastSummaryMetrics,
  ModelMetadata,
} from "@/lib/mock-data/forecast";

export const ForecastApi = {
  async getSummary(): Promise<ForecastSummaryMetrics> {
    if (isMockMode()) {
      return FORECAST_SUMMARY;
    }
    return apiFetch<ForecastSummaryMetrics>("/api/forecast/summary");
  },

  async getMainTimeseries(params?: { dateRange?: string; region?: string; sku?: string }) {
    if (isMockMode()) {
      return MAIN_FORECAST_TIMESERIES;
    }
    const query = new URLSearchParams(params as any).toString();
    return apiFetch<typeof MAIN_FORECAST_TIMESERIES>(`/api/forecast/timeseries?${query}`);
  },

  async getForecastVsActual() {
    if (isMockMode()) {
      return FORECAST_VS_ACTUAL_EVAL;
    }
    return apiFetch<typeof FORECAST_VS_ACTUAL_EVAL>("/api/forecast/vs-actual");
  },

  async getForecastTable() {
    if (isMockMode()) {
      return FORECAST_TABLE_DATA;
    }
    return apiFetch<typeof FORECAST_TABLE_DATA>("/api/forecast/table");
  },

  async getModelMetadata(): Promise<ModelMetadata> {
    if (isMockMode()) {
      return MODEL_METADATA;
    }
    return apiFetch<ModelMetadata>("/api/forecast/model-info");
  },
};
