import { isMockMode, apiFetch } from "./client";
import {
  QUALITY_SUMMARY_DATA,
  QUALITY_COMPONENTS_DATA,
  QUALITY_TREND_DATA,
  QUALITY_BATCH_HISTORY,
  REJECTS_SUMMARY,
  METADATA_CATALOG_SCHEMA,
  QualityMetricSummary,
  QualityBatchRecord,
  RejectedRecordSummary,
  MetadataColumnSchema,
} from "@/lib/mock-data/quality";

export const QualityApi = {
  async getSummary(): Promise<QualityMetricSummary> {
    if (isMockMode()) {
      return QUALITY_SUMMARY_DATA;
    }
    return apiFetch<QualityMetricSummary>("/api/quality/summary");
  },

  async getComponents() {
    if (isMockMode()) {
      return QUALITY_COMPONENTS_DATA;
    }
    return apiFetch<typeof QUALITY_COMPONENTS_DATA>("/api/quality/components");
  },

  async getTrend() {
    if (isMockMode()) {
      return QUALITY_TREND_DATA;
    }
    return apiFetch<typeof QUALITY_TREND_DATA>("/api/quality/trend");
  },

  async getBatches(): Promise<QualityBatchRecord[]> {
    if (isMockMode()) {
      return QUALITY_BATCH_HISTORY;
    }
    return apiFetch<QualityBatchRecord[]>("/api/quality/batches");
  },

  async getRejects(): Promise<RejectedRecordSummary[]> {
    if (isMockMode()) {
      return REJECTS_SUMMARY;
    }
    return apiFetch<RejectedRecordSummary[]>("/api/quality/rejects");
  },

  async getMetadataCatalog(): Promise<MetadataColumnSchema[]> {
    if (isMockMode()) {
      return METADATA_CATALOG_SCHEMA;
    }
    return apiFetch<MetadataColumnSchema[]>("/api/quality/metadata");
  },
};
