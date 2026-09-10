// Project Data Contracts for Enterprise Data Intelligence Platform
// Strictly matching backend schema definitions.

// ==========================================
// Data Ingestion & Quality Layer
// ==========================================

export interface Batch {
  batch_id: string;
  filename: string;
  uploaded_by: string;
  uploaded_at: string;
  status: "COMPLETED" | "PROCESSING" | "FAILED" | "PENDING";
  row_count: number;
  file_size_mb: number;
}

export interface QualityScore {
  score_id: string;
  batch_id: string;
  overall_score: number; // 0-100
  completeness_score: number;
  validity_score: number;
  consistency_score: number;
  uniqueness_score: number;
  passed_rows: number;
  rejected_rows: number;
  evaluated_at: string;
}

export interface MetadataCatalog {
  catalog_id: string;
  table_name: string;
  column_name: string;
  data_type: string;
  is_nullable: boolean;
  sample_values: string[];
  description: string;
}

export interface PipelineLog {
  log_id: string;
  batch_id: string;
  step_name: "ingestion" | "schema" | "validation" | "cleaning" | "quality_scoring";
  status: "SUCCESS" | "WARNING" | "ERROR" | "INFO";
  message: string;
  timestamp: string;
}

// ==========================================
// Analytics, Forecasting & Detection Layer
// ==========================================

export interface MetricItem {
  metric_id: string;
  metric_name: string;
  category: "Revenue" | "Operations" | "Customer" | "Supply Chain";
  current_value: number;
  previous_value: number;
  change_percent: number;
  unit: string;
  period: string;
  updated_at: string;
}

export interface ForecastPoint {
  date: string;
  actual_value?: number;
  forecast_value: number;
  lower_bound: number;
  upper_bound: number;
}

export interface ForecastModelRun {
  model_id: string;
  metric_name: string;
  model_type: string; // e.g., Prophet, ARIMA, XGBoost
  horizon_days: number;
  mape_error: number;
  r2_score: number;
  created_at: string;
  forecast_data: ForecastPoint[];
}

export interface AnomalyItem {
  anomaly_id: string;
  metric_name: string;
  detected_at: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  actual_value: number;
  expected_value: number;
  deviation_percent: number;
  root_cause_hint: string;
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
}

// ==========================================
// Verification, Scenario & Dashboard Layer
// ==========================================

export interface VerifiedInsight {
  insight_id: string;
  title: string;
  description: string;
  category: "Financial" | "Operational" | "Risk" | "Growth";
  source_table: string;
  confidence_score: number;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  verified_by?: string;
  verified_at?: string;
  review_notes?: string;
  created_at: string;
}

export interface ScenarioParameter {
  key: string;
  name: string;
  baseline_value: number;
  current_value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface WhatIfScenario {
  scenario_id: string;
  name: string;
  description: string;
  created_at: string;
  parameters: ScenarioParameter[];
  projected_revenue: number;
  projected_margin: number;
  projected_risk_score: number;
  comparison_chart: Array<{
    month: string;
    baseline: number;
    simulated: number;
  }>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "anomaly" | "verification" | "system" | "quality";
}
