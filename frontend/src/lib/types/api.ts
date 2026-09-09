// Comprehensive Backend API TypeScript Response Interfaces
// Architecture: Next.js -> REST API (Python Backend) -> PostgreSQL

// ==========================================
// MEMBER 1: Ingestion & Quality Layer Types
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
  overall_score: number;
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

export interface RejectRecord {
  id: string;
  reason: string;
  count: number;
  percentage: number;
  sample_value: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

// ==========================================
// MEMBER 2: Analytics, Forecast & Anomaly Types
// ==========================================

export interface Metric {
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
  entity?: string;
  actual_value?: number;
  forecast_value: number; // yhat
  lower_bound: number; // yhat_lower
  upper_bound: number; // yhat_upper
}

export interface ForecastModelRun {
  model_id: string;
  metric_name: string;
  model_type: string;
  horizon_days: number;
  mape_error: number;
  r2_score: number;
  created_at: string;
  forecast_data: ForecastPoint[];
}

export interface AnomalyEvidence {
  actualValue: string;
  expectedValue: string;
  deviationPercent: string;
  zScore: number;
  baselinePeriod: string;
}

export interface Anomaly {
  id: string;
  entity: string;
  region: string;
  product: string;
  timestamp: string;
  score: number;
  reason_short: string;
  root_cause_notes: string;
  evidence: AnomalyEvidence;
  related_metrics: string[];
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
}

// ==========================================
// MEMBER 3: Verification & Scenario Types
// ==========================================

export interface InsightComment {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface VerifiedInsight {
  id: string;
  title: string;
  finding: string;
  source: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  confidenceScore: number;
  createdAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "EDITED";
  verifiedBy?: string;
  verifiedAt?: string;
  evidence: {
    historicalComparison: string;
    anomalyScore: number;
    relevantKPI: string;
    rootCause: string;
  };
  comments: InsightComment[];
}

export interface ScenarioResultTimeline {
  month: string;
  baseline: number;
  simulated: number;
}

export interface ScenarioResult {
  baseline_demand: number;
  demand_change: number;
  projected_demand: number;
  projected_inventory: number;
  shortage: number;
  recommendation: string;
  impact_timeline: ScenarioResultTimeline[];
}

export interface ScenarioRecord {
  id: string;
  name: string;
  createdAt: string;
  demandChangePercent: number;
  projectedDemand: number;
  shortageSurplus: number;
  status: "ACTIVE" | "SAVED" | "ARCHIVED";
}

export interface UploadResult {
  batchId: string;
  filename: string;
  fileSizeMb: number;
  rowsProcessed: number;
  rowsRejected: number;
  qualityScore: number;
  status: "COMPLETED" | "FAILED";
  completedAt: string;
}
