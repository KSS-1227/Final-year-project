export interface AnomalyRecord {
  id: string;
  entity: string;
  region: string;
  product: string;
  timestamp: string;
  score: number;
  reason_short: string;
  root_cause_notes: string;
  evidence: {
    actualValue: string;
    expectedValue: string;
    deviationPercent: string;
    zScore: number;
    baselinePeriod: string;
  };
  related_metrics: string[];
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "INVESTIGATING" | "RESOLVED";
}

export interface AnomalyTrendPoint {
  date: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}
