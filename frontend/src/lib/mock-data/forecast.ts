export interface ForecastSummaryMetrics {
  horizon: string;
  accuracy: number;
  expectedDemand: number;
  trend: number;
}

export interface ForecastDataPoint {
  date: string;
  entity: string;
  actual?: number;
  yhat?: number;
  yhat_lower?: number;
  yhat_upper?: number;
}

export interface ForecastVsActualPoint {
  date: string;
  entity: string;
  actual: number;
  forecast: number;
  variance: number;
  variancePercent: number;
}

export interface ModelMetadata {
  modelName: string;
  algorithm: string;
  trainedAt: string;
  mae: number;
  mape: number;
  r2Score: number;
  version: string;
  featuresUsed: string[];
}
