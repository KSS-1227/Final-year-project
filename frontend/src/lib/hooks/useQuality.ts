"use client";

import { useState, useEffect } from "react";
import { QualityApi } from "@/lib/api/quality";
import { QualityMetricSummary, QualityBatchRecord, RejectedRecordSummary, MetadataColumnSchema } from "@/lib/mock-data/quality";

export function useQuality() {
  const [summary, setSummary] = useState<QualityMetricSummary | null>(null);
  const [components, setComponents] = useState<any[]>([]);
  const [trend, setTrend] = useState<any[]>([]);
  const [batches, setBatches] = useState<QualityBatchRecord[]>([]);
  const [rejects, setRejects] = useState<RejectedRecordSummary[]>([]);
  const [metadata, setMetadata] = useState<MetadataColumnSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sRes, cRes, tRes, bRes, rRes, mRes] = await Promise.all([
        QualityApi.getSummary(),
        QualityApi.getComponents(),
        QualityApi.getTrend(),
        QualityApi.getBatches(),
        QualityApi.getRejects(),
        QualityApi.getMetadataCatalog(),
      ]);
      setSummary(sRes);
      setComponents(cRes);
      setTrend(tRes);
      setBatches(bRes);
      setRejects(rRes);
      setMetadata(mRes);
    } catch (err: any) {
      setError(err.message || "Failed to load data quality metrics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { summary, components, trend, batches, rejects, metadata, isLoading, error, refresh: fetchAll };
}
