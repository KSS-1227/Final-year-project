import { apiFetch } from "./client";
import {
  QualityMetricSummary,
  QualityComponentScore,
  QualityTrendPoint,
  QualityBatchRecord,
  RejectedRecordSummary,
  MetadataColumnSchema,
} from "@/lib/mock-data/quality";

export const QualityApi = {
  async getSummary(): Promise<QualityMetricSummary> {
    return apiFetch<QualityMetricSummary>("/api/quality/summary");
  },

  async getComponents() {
    return apiFetch<QualityComponentScore[]>("/api/quality/components");
  },

  async getTrend() {
    return apiFetch<QualityTrendPoint[]>("/api/quality/trend");
  },

  async getBatches(): Promise<QualityBatchRecord[]> {
    return apiFetch<QualityBatchRecord[]>("/api/quality/batches");
  },

  async getRejects(): Promise<RejectedRecordSummary[]> {
    return apiFetch<RejectedRecordSummary[]>("/api/quality/rejects");
  },

  async getMetadataCatalog(): Promise<MetadataColumnSchema[]> {
    return apiFetch<MetadataColumnSchema[]>("/api/quality/metadata");
  },
};
