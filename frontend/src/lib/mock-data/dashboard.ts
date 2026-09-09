export interface KPIItem {
  id: string;
  title: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendPositive?: boolean; // whether "up" is good or bad (e.g. anomalies down is good)
  supportingText: string;
  statusBadge?: {
    text: string;
    variant: "success" | "warning" | "danger" | "info";
  };
  iconName: "quality" | "revenue" | "units" | "anomalies" | "accuracy";
}

export interface PerformanceDataPoint {
  date: string;
  actual?: number;
  forecast?: number;
}

export interface KeyInsightItem {
  id: string;
  text: string;
  category: "revenue" | "anomaly" | "forecast" | "quality";
  type: "positive" | "warning" | "neutral" | "info";
}

export interface DashboardAnomaly {
  id: string;
  metric: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  actual: string;
  expected: string;
  detectedAt: string;
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
}

export interface DashboardBatch {
  batchId: string;
  uploadDate: string;
  rowCount: number;
  qualityScore: number;
  status: "COMPLETED" | "PROCESSING" | "FAILED" | "PENDING";
}

export const DASHBOARD_KPIS: KPIItem[] = [
  {
    id: "kpi-quality",
    title: "Data Quality",
    value: "94/100",
    supportingText: "Pipeline validation target ≥90",
    statusBadge: {
      text: "PASS",
      variant: "success",
    },
    iconName: "quality",
  },
  {
    id: "kpi-revenue",
    title: "Revenue",
    value: "₹12.4M",
    trend: "+8.2%",
    trendDirection: "up",
    trendPositive: true,
    supportingText: "vs. previous 30 days period",
    iconName: "revenue",
  },
  {
    id: "kpi-units",
    title: "Units",
    value: "45,230",
    trend: "+5.4%",
    trendDirection: "up",
    trendPositive: true,
    supportingText: "Processed across regions",
    iconName: "units",
  },
  {
    id: "kpi-anomalies",
    title: "Anomalies",
    value: "18",
    trend: "-12%",
    trendDirection: "down",
    trendPositive: true, // fewer anomalies is positive
    supportingText: "Requiring decision review",
    iconName: "anomalies",
  },
  {
    id: "kpi-accuracy",
    title: "Forecast Accuracy",
    value: "91.6%",
    trend: "+3.1%",
    trendDirection: "up",
    trendPositive: true,
    supportingText: "Prophet + XGBoost ensemble",
    iconName: "accuracy",
  },
];

export const PERFORMANCE_CHART_DATA: PerformanceDataPoint[] = [
  { date: "May 01", actual: 8.2, forecast: 8.1 },
  { date: "May 15", actual: 8.9, forecast: 8.7 },
  { date: "Jun 01", actual: 9.4, forecast: 9.3 },
  { date: "Jun 15", actual: 10.1, forecast: 9.9 },
  { date: "Jul 01", actual: 10.8, forecast: 10.6 },
  { date: "Jul 15", actual: 11.2, forecast: 11.0 },
  { date: "Aug 01", actual: 11.7, forecast: 11.5 },
  { date: "Aug 15", actual: 12.1, forecast: 11.9 },
  { date: "Sep 01", actual: 12.4, forecast: 12.2 },
  { date: "Sep 15", forecast: 12.7 },
  { date: "Oct 01", forecast: 13.1 },
  { date: "Oct 15", forecast: 13.5 },
  { date: "Nov 01", forecast: 14.0 },
];

export const KEY_INSIGHTS: KeyInsightItem[] = [
  {
    id: "ins-1",
    text: "Revenue increased 8.2% this period driven by enterprise renewals in South region.",
    category: "revenue",
    type: "positive",
  },
  {
    id: "ins-2",
    text: "18 anomalies require attention, primarily in logistics freight cost surcharges.",
    category: "anomaly",
    type: "warning",
  },
  {
    id: "ins-3",
    text: "Forecast accuracy improved to 91.6% following Q3 model ensemble re-training.",
    category: "forecast",
    type: "positive",
  },
  {
    id: "ins-4",
    text: "Data quality is currently PASS with zero critical schema mismatches detected.",
    category: "quality",
    type: "info",
  },
];

export const RECENT_ANOMALIES_5: DashboardAnomaly[] = [
  {
    id: "ANOM-2026-01",
    metric: "EU Shipping Freight Cost / Unit",
    severity: "CRITICAL",
    actual: "₹4,860",
    expected: "₹2,920",
    detectedAt: "Sep 09, 04:12",
    status: "OPEN",
  },
  {
    id: "ANOM-2026-02",
    metric: "APAC Customer Checkout Latency",
    severity: "HIGH",
    actual: "4.2s",
    expected: "1.1s",
    detectedAt: "Sep 08, 22:30",
    status: "INVESTIGATING",
  },
  {
    id: "ANOM-2026-03",
    metric: "NA North Region Unit Returns Rate",
    severity: "HIGH",
    actual: "8.4%",
    expected: "3.1%",
    detectedAt: "Sep 08, 18:45",
    status: "OPEN",
  },
  {
    id: "ANOM-2026-04",
    metric: "Database Ingestion Queue Backlog",
    severity: "MEDIUM",
    actual: "14,200",
    expected: "1,500",
    detectedAt: "Sep 08, 14:10",
    status: "RESOLVED",
  },
  {
    id: "ANOM-2026-05",
    metric: "Discount Code Usage Spike",
    severity: "LOW",
    actual: "1,240",
    expected: "450",
    detectedAt: "Sep 07, 11:00",
    status: "RESOLVED",
  },
];

export const RECENT_BATCHES_5: DashboardBatch[] = [
  {
    batchId: "BATCH-2026-0901",
    uploadDate: "Sep 08, 2026",
    rowCount: 148200,
    qualityScore: 96.4,
    status: "COMPLETED",
  },
  {
    batchId: "BATCH-2026-0902",
    uploadDate: "Sep 09, 2026",
    rowCount: 92450,
    qualityScore: 91.8,
    status: "COMPLETED",
  },
  {
    batchId: "BATCH-2026-0903",
    uploadDate: "Sep 09, 2026",
    rowCount: 45000,
    qualityScore: 88.5,
    status: "PROCESSING",
  },
  {
    batchId: "BATCH-2026-0899",
    uploadDate: "Sep 07, 2026",
    rowCount: 12400,
    qualityScore: 64.2,
    status: "FAILED",
  },
  {
    batchId: "BATCH-2026-0898",
    uploadDate: "Sep 06, 2026",
    rowCount: 210500,
    qualityScore: 98.1,
    status: "COMPLETED",
  },
];
