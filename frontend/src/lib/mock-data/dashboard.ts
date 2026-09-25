export interface KPIItem {
  id: string;
  title: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  trendPositive?: boolean;
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
