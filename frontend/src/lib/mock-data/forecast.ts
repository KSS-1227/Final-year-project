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
  yhat?: number; // forecast point estimate
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

export const FORECAST_SUMMARY: ForecastSummaryMetrics = {
  horizon: "28 Days",
  accuracy: 91.6,
  expectedDemand: 12480,
  trend: 8.4,
};

export const MAIN_FORECAST_TIMESERIES: ForecastDataPoint[] = [
  // Historical Actuals
  { date: "Aug 12", entity: "All Regions", actual: 10200 },
  { date: "Aug 15", entity: "All Regions", actual: 10450 },
  { date: "Aug 18", entity: "All Regions", actual: 10800 },
  { date: "Aug 21", entity: "All Regions", actual: 10920 },
  { date: "Aug 24", entity: "All Regions", actual: 11100 },
  { date: "Aug 27", entity: "All Regions", actual: 11350 },
  { date: "Aug 30", entity: "All Regions", actual: 11500 },
  { date: "Sep 02", entity: "All Regions", actual: 11720 },
  { date: "Sep 05", entity: "All Regions", actual: 11950 },
  { date: "Sep 08", entity: "All Regions", actual: 12100, yhat: 12100, yhat_lower: 11800, yhat_upper: 12400 },
  // Future Forecast Points
  { date: "Sep 11", entity: "All Regions", yhat: 12250, yhat_lower: 11900, yhat_upper: 12600 },
  { date: "Sep 14", entity: "All Regions", yhat: 12380, yhat_lower: 12000, yhat_upper: 12760 },
  { date: "Sep 17", entity: "All Regions", yhat: 12480, yhat_lower: 12080, yhat_upper: 12880 },
  { date: "Sep 20", entity: "All Regions", yhat: 12620, yhat_lower: 12180, yhat_upper: 13060 },
  { date: "Sep 23", entity: "All Regions", yhat: 12790, yhat_lower: 12300, yhat_upper: 13280 },
  { date: "Sep 26", entity: "All Regions", yhat: 12950, yhat_lower: 12420, yhat_upper: 13480 },
  { date: "Sep 29", entity: "All Regions", yhat: 13120, yhat_lower: 12550, yhat_upper: 13690 },
  { date: "Oct 02", entity: "All Regions", yhat: 13300, yhat_lower: 12700, yhat_upper: 13900 },
  { date: "Oct 05", entity: "All Regions", yhat: 13480, yhat_lower: 12850, yhat_upper: 14110 },
];

export const FORECAST_VS_ACTUAL_EVAL: ForecastVsActualPoint[] = [
  { date: "Aug 21", entity: "NA-East", actual: 3450, forecast: 3400, variance: 50, variancePercent: 1.47 },
  { date: "Aug 24", entity: "NA-East", actual: 3520, forecast: 3480, variance: 40, variancePercent: 1.15 },
  { date: "Aug 27", entity: "NA-East", actual: 3600, forecast: 3580, variance: 20, variancePercent: 0.56 },
  { date: "Aug 30", entity: "NA-East", actual: 3680, forecast: 3720, variance: -40, variancePercent: -1.08 },
  { date: "Sep 02", entity: "NA-East", actual: 3750, forecast: 3810, variance: -60, variancePercent: -1.60 },
  { date: "Sep 05", entity: "NA-East", actual: 3890, forecast: 3860, variance: 30, variancePercent: 0.78 },
  { date: "Sep 08", entity: "NA-East", actual: 3950, forecast: 3920, variance: 30, variancePercent: 0.76 },
];

export const FORECAST_TABLE_DATA = [
  { date: "Sep 11, 2026", entity: "NA-East Enterprise", actual: "-", forecast: 4120, variance: "±180" },
  { date: "Sep 11, 2026", entity: "EU-Central Retail", actual: "-", forecast: 3450, variance: "±150" },
  { date: "Sep 11, 2026", entity: "APAC-South Logistics", actual: "-", forecast: 2680, variance: "±120" },
  { date: "Sep 14, 2026", entity: "NA-East Enterprise", actual: "-", forecast: 4180, variance: "±190" },
  { date: "Sep 14, 2026", entity: "EU-Central Retail", actual: "-", forecast: 3510, variance: "±160" },
  { date: "Sep 14, 2026", entity: "APAC-South Logistics", actual: "-", forecast: 2720, variance: "±130" },
  { date: "Sep 17, 2026", entity: "NA-East Enterprise", actual: "-", forecast: 4250, variance: "±200" },
  { date: "Sep 17, 2026", entity: "EU-Central Retail", actual: "-", forecast: 3580, variance: "±165" },
];

export const MODEL_METADATA: ModelMetadata = {
  modelName: "Demand Predictor Ensemble",
  algorithm: "Prophet + XGBoost + Holt-Winters",
  trainedAt: "Sep 08, 2026 18:30 IST",
  mae: 142.5,
  mape: 3.12,
  r2Score: 0.948,
  version: "v2.4.1-prod",
  featuresUsed: [
    "historical_sales_lag_7d",
    "historical_sales_lag_30d",
    "regional_macro_index",
    "seasonality_fourier_terms",
    "promotional_calendar_flag",
  ],
};
