import {
  Batch,
  QualityScore,
  MetadataCatalog,
  PipelineLog,
  MetricItem,
  ForecastModelRun,
  AnomalyItem,
  VerifiedInsight,
  WhatIfScenario,
  NotificationItem,
} from "@/types/data-contracts";

// ==========================================
// INGESTION AND QUALITY MOCK DATA
// ==========================================

export const MOCK_BATCHES: Batch[] = [
  {
    batch_id: "BATCH-2026-0901",
    filename: "Q3_Enterprise_Sales_Master.xlsx",
    uploaded_by: "Operations Analyst (User 01)",
    uploaded_at: "2026-09-08T14:32:00Z",
    status: "COMPLETED",
    row_count: 148200,
    file_size_mb: 18.4,
  },
  {
    batch_id: "BATCH-2026-0902",
    filename: "Global_SupplyChain_Logistics_Aug2026.csv",
    uploaded_by: "Supply Chain Manager",
    uploaded_at: "2026-09-09T09:15:00Z",
    status: "COMPLETED",
    row_count: 92450,
    file_size_mb: 12.1,
  },
  {
    batch_id: "BATCH-2026-0903",
    filename: "Customer_Churn_Telemetry_Raw.csv",
    uploaded_by: "Product Intelligence Team",
    uploaded_at: "2026-09-09T16:45:00Z",
    status: "PROCESSING",
    row_count: 45000,
    file_size_mb: 5.8,
  },
  {
    batch_id: "BATCH-2026-0899",
    filename: "Legacy_ERP_Financial_Export_v2.xlsx",
    uploaded_by: "Finance Analyst",
    uploaded_at: "2026-09-07T11:20:00Z",
    status: "FAILED",
    row_count: 12400,
    file_size_mb: 3.2,
  },
];

export const MOCK_QUALITY_SCORES: QualityScore[] = [
  {
    score_id: "QS-0901",
    batch_id: "BATCH-2026-0901",
    overall_score: 96.4,
    completeness_score: 98.2,
    validity_score: 95.8,
    consistency_score: 96.1,
    uniqueness_score: 95.5,
    passed_rows: 142864,
    rejected_rows: 5336,
    evaluated_at: "2026-09-08T14:35:12Z",
  },
  {
    score_id: "QS-0902",
    batch_id: "BATCH-2026-0902",
    overall_score: 91.8,
    completeness_score: 93.5,
    validity_score: 90.2,
    consistency_score: 92.4,
    uniqueness_score: 91.1,
    passed_rows: 84869,
    rejected_rows: 7581,
    evaluated_at: "2026-09-09T09:18:40Z",
  },
];

export const MOCK_METADATA_CATALOG: MetadataCatalog[] = [
  {
    catalog_id: "MC-101",
    table_name: "cleaned_sales_transactions",
    column_name: "transaction_amount",
    data_type: "DECIMAL(12,2)",
    is_nullable: false,
    sample_values: ["12450.00", "890.50", "43000.75"],
    description: "Normalized monetary transaction value in USD after currency conversion.",
  },
  {
    catalog_id: "MC-102",
    table_name: "cleaned_sales_transactions",
    column_name: "region_code",
    data_type: "VARCHAR(10)",
    is_nullable: false,
    sample_values: ["NA-EAST", "EU-CENTRAL", "APAC-SOUTH"],
    description: "Standardized geographical reporting region.",
  },
  {
    catalog_id: "MC-103",
    table_name: "cleaned_supply_chain",
    column_name: "lead_time_days",
    data_type: "INTEGER",
    is_nullable: true,
    sample_values: ["14", "22", "8"],
    description: "Fulfillment lead time in days from supplier dispatch to warehouse receipt.",
  },
];

export const MOCK_PIPELINE_LOGS: PipelineLog[] = [
  {
    log_id: "PL-501",
    batch_id: "BATCH-2026-0901",
    step_name: "ingestion",
    status: "SUCCESS",
    message: "Ingested 148,200 raw records into staging table `raw_normalized`.",
    timestamp: "2026-09-08T14:32:15Z",
  },
  {
    log_id: "PL-502",
    batch_id: "BATCH-2026-0901",
    step_name: "schema",
    status: "SUCCESS",
    message: "Schema validation matched catalog `metadata_catalog` with 14 active columns.",
    timestamp: "2026-09-08T14:32:45Z",
  },
  {
    log_id: "PL-503",
    batch_id: "BATCH-2026-0901",
    step_name: "validation",
    status: "WARNING",
    message: "Detected 5,336 non-conforming rows (missing customer tax IDs). Moved to `rejects`.",
    timestamp: "2026-09-08T14:33:30Z",
  },
  {
    log_id: "PL-504",
    batch_id: "BATCH-2026-0901",
    step_name: "quality_scoring",
    status: "SUCCESS",
    message: "Data Quality Score calculated: 96.4%. Standardized table `cleaned_sales` generated.",
    timestamp: "2026-09-08T14:35:12Z",
  },
];

// ==========================================
// ANALYTICS, FORECAST, AND DETECTION MOCK DATA
// ==========================================

export const MOCK_METRICS: MetricItem[] = [
  {
    metric_id: "MTR-01",
    metric_name: "Quarterly Enterprise ARR",
    category: "Revenue",
    current_value: 14250000,
    previous_value: 12800000,
    change_percent: 11.3,
    unit: "$",
    period: "Q3 2026",
    updated_at: "2026-09-09T08:00:00Z",
  },
  {
    metric_id: "MTR-02",
    metric_name: "Gross Operating Margin",
    category: "Revenue",
    current_value: 68.4,
    previous_value: 65.1,
    change_percent: 5.07,
    unit: "%",
    period: "Aug 2026",
    updated_at: "2026-09-09T08:00:00Z",
  },
  {
    metric_id: "MTR-03",
    metric_name: "Supply Chain On-Time Delivery Rate",
    category: "Supply Chain",
    current_value: 94.2,
    previous_value: 97.8,
    change_percent: -3.68,
    unit: "%",
    period: "Aug 2026",
    updated_at: "2026-09-09T08:00:00Z",
  },
  {
    metric_id: "MTR-04",
    metric_name: "Net Revenue Retention (NRR)",
    category: "Customer",
    current_value: 118.5,
    previous_value: 116.2,
    change_percent: 1.98,
    unit: "%",
    period: "Q3 2026",
    updated_at: "2026-09-09T08:00:00Z",
  },
];

export const MOCK_FORECAST_RUNS: ForecastModelRun[] = [
  {
    model_id: "MOD-FB-2026",
    metric_name: "Monthly Enterprise Revenue",
    model_type: "Prophet + XGBoost Ensemble",
    horizon_days: 90,
    mape_error: 3.12,
    r2_score: 0.948,
    created_at: "2026-09-08T18:00:00Z",
    forecast_data: [
      { date: "2026-04", actual_value: 4.1, forecast_value: 4.05, lower_bound: 3.9, upper_bound: 4.2 },
      { date: "2026-05", actual_value: 4.3, forecast_value: 4.28, lower_bound: 4.1, upper_bound: 4.45 },
      { date: "2026-06", actual_value: 4.5, forecast_value: 4.46, lower_bound: 4.3, upper_bound: 4.65 },
      { date: "2026-07", actual_value: 4.7, forecast_value: 4.68, lower_bound: 4.5, upper_bound: 4.85 },
      { date: "2026-08", actual_value: 4.85, forecast_value: 4.82, lower_bound: 4.65, upper_bound: 5.0 },
      { date: "2026-09", forecast_value: 5.12, lower_bound: 4.88, upper_bound: 5.35 },
      { date: "2026-10", forecast_value: 5.38, lower_bound: 5.10, upper_bound: 5.66 },
      { date: "2026-11", forecast_value: 5.65, lower_bound: 5.32, upper_bound: 5.98 },
      { date: "2026-12", forecast_value: 6.10, lower_bound: 5.70, upper_bound: 6.50 },
    ],
  },
];

export const MOCK_ANOMALIES: AnomalyItem[] = [
  {
    anomaly_id: "ANOM-2026-881",
    metric_name: "EU-Central Shipping Cost / Unit",
    detected_at: "2026-09-09T04:12:00Z",
    severity: "CRITICAL",
    actual_value: 48.6,
    expected_value: 29.2,
    deviation_percent: 66.4,
    root_cause_hint: "Logistics fuel surcharge spike combined with regional carrier capacity bottleneck.",
    status: "OPEN",
  },
  {
    anomaly_id: "ANOM-2026-879",
    metric_name: "APAC-South Enterprise Lead Conversion",
    detected_at: "2026-09-08T22:30:00Z",
    severity: "HIGH",
    actual_value: 4.2,
    expected_value: 12.8,
    deviation_percent: -67.1,
    root_cause_hint: "Localized payment gateway latency causing checkout drop-offs.",
    status: "INVESTIGATING",
  },
  {
    anomaly_id: "ANOM-2026-872",
    metric_name: "Database Query Latency (Read Replica 3)",
    detected_at: "2026-09-08T11:05:00Z",
    severity: "MEDIUM",
    actual_value: 420,
    expected_value: 110,
    deviation_percent: 281.8,
    root_cause_hint: "Unindexed query join on `raw_normalized` table during ETL sync.",
    status: "RESOLVED",
  },
];

// ==========================================
// VERIFICATION AND SCENARIO MOCK DATA
// ==========================================

export const MOCK_VERIFIED_INSIGHTS: VerifiedInsight[] = [
  {
    insight_id: "INS-001",
    title: "Q4 Supply Chain Buffer Recommendation",
    description: "Increasing safety stock by 12% in EU-Central will offset predicted freight surcharge spikes with an expected net ROI of $320,000.",
    category: "Operational",
    source_table: "metrics_store + forecasts",
    confidence_score: 94.2,
    status: "VERIFIED",
    verified_by: "Elena Rostova (Chief Operations Officer)",
    verified_at: "2026-09-09T10:15:00Z",
    review_notes: "Approved based on Q3 carrier trend correlation analysis.",
    created_at: "2026-09-08T19:00:00Z",
  },
  {
    insight_id: "INS-002",
    title: "Pricing Expansion Strategy - APAC-South Enterprise tier",
    description: "Adjusting annual contract indexation by +4.5% yields projected +$1.8M ARR with less than 0.8% estimated churn impact.",
    category: "Financial",
    source_table: "forecasts + scenarios",
    confidence_score: 89.5,
    status: "PENDING",
    review_notes: "Awaiting final review from Regional Sales Vice President.",
    created_at: "2026-09-09T12:30:00Z",
  },
  {
    insight_id: "INS-003",
    title: "Legacy Infrastructure Sunset Optimization",
    description: "Migrating batch ETL processing from legacy servers to autoscaling instances will cut compute overhead by $42,000/month.",
    category: "Risk",
    source_table: "pipeline_logs + metrics_store",
    confidence_score: 97.8,
    status: "VERIFIED",
    verified_by: "Marcus Vance (VP Engineering)",
    verified_at: "2026-09-09T08:45:00Z",
    review_notes: "Verified against ingestion pipeline benchmark reports.",
    created_at: "2026-09-07T14:10:00Z",
  },
];

export const MOCK_WHAT_IF_SCENARIOS: WhatIfScenario[] = [
  {
    scenario_id: "SCEN-2026-A",
    name: "Standard Growth Baseline (Q4 2026)",
    description: "Baseline scenario keeping current price points, marketing spend, and operational expansion rate constant.",
    created_at: "2026-09-09T09:00:00Z",
    parameters: [
      { key: "price_adjustment", name: "Price Adjustment Rate (%)", baseline_value: 0, current_value: 0, min: -10, max: 20, step: 0.5, unit: "%" },
      { key: "marketing_budget", name: "Marketing Budget ($k)", baseline_value: 500, current_value: 500, min: 200, max: 1500, step: 50, unit: "$k" },
      { key: "churn_rate_delta", name: "Estimated Churn Delta (%)", baseline_value: 0, current_value: 0, min: -2, max: 5, step: 0.1, unit: "%" },
      { key: "freight_cost_index", name: "Freight Inflation Index", baseline_value: 100, current_value: 100, min: 80, max: 160, step: 5, unit: "pts" },
    ],
    projected_revenue: 16400000,
    projected_margin: 68.4,
    projected_risk_score: 24,
    comparison_chart: [
      { month: "Oct 2026", baseline: 5.1, simulated: 5.1 },
      { month: "Nov 2026", baseline: 5.4, simulated: 5.4 },
      { month: "Dec 2026", baseline: 5.9, simulated: 5.9 },
    ],
  },
  {
    scenario_id: "SCEN-2026-B",
    name: "Aggressive Expansion & Freight Hedge",
    description: "Increased marketing budget (+30%) paired with regional warehousing buffer to absorb shipping surges.",
    created_at: "2026-09-09T14:20:00Z",
    parameters: [
      { key: "price_adjustment", name: "Price Adjustment Rate (%)", baseline_value: 0, current_value: 4.5, min: -10, max: 20, step: 0.5, unit: "%" },
      { key: "marketing_budget", name: "Marketing Budget ($k)", baseline_value: 500, current_value: 750, min: 200, max: 1500, step: 50, unit: "$k" },
      { key: "churn_rate_delta", name: "Estimated Churn Delta (%)", baseline_value: 0, current_value: 0.3, min: -2, max: 5, step: 0.1, unit: "%" },
      { key: "freight_cost_index", name: "Freight Inflation Index", baseline_value: 100, current_value: 115, min: 80, max: 160, step: 5, unit: "pts" },
    ],
    projected_revenue: 18250000,
    projected_margin: 71.2,
    projected_risk_score: 38,
    comparison_chart: [
      { month: "Oct 2026", baseline: 5.1, simulated: 5.6 },
      { month: "Nov 2026", baseline: 5.4, simulated: 6.1 },
      { month: "Dec 2026", baseline: 5.9, simulated: 6.55 },
    ],
  },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "NOTIF-1",
    title: "Critical Anomaly Detected",
    message: "EU-Central Shipping Cost spiked by +66.4% above baseline.",
    timestamp: "12 mins ago",
    read: false,
    type: "anomaly",
  },
  {
    id: "NOTIF-2",
    title: "Insight Verification Request",
    message: "New recommendation 'Pricing Expansion Strategy' ready for review.",
    timestamp: "45 mins ago",
    read: false,
    type: "verification",
  },
  {
    id: "NOTIF-3",
    title: "Data Batch Ingestion Complete",
    message: "Batch `BATCH-2026-0901` scored 96.4% quality score.",
    timestamp: "3 hours ago",
    read: true,
    type: "quality",
  },
];
