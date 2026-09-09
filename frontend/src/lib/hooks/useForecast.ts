"use client";

import { useState, useEffect } from "react";
import { ForecastApi } from "@/lib/api/forecast";
import { ForecastSummaryMetrics, ModelMetadata } from "@/lib/mock-data/forecast";

export function useForecast(dateRange = "28d", region = "all", sku = "all") {
  const [summary, setSummary] = useState<ForecastSummaryMetrics | null>(null);
  const [timeseries, setTimeseries] = useState<any[]>([]);
  const [vsActual, setVsActual] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [modelInfo, setModelInfo] = useState<ModelMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [sRes, tRes, vRes, tblRes, mRes] = await Promise.all([
        ForecastApi.getSummary(),
        ForecastApi.getMainTimeseries({ dateRange, region, sku }),
        ForecastApi.getForecastVsActual(),
        ForecastApi.getForecastTable(),
        ForecastApi.getModelMetadata(),
      ]);
      setSummary(sRes);
      setTimeseries(tRes);
      setVsActual(vRes);
      setTableData(tblRes);
      setModelInfo(mRes);
    } catch (err: any) {
      setError(err.message || "Failed to load forecast data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [dateRange, region, sku]);

  return { summary, timeseries, vsActual, tableData, modelInfo, isLoading, error, refresh: fetchAll };
}
