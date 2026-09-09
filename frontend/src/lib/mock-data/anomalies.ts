export interface AnomalyRecord {
  id: string;
  entity: string;
  region: string;
  product: string;
  timestamp: string;
  score: number; // e.g., 0 - 5.0 or 0 - 100 anomaly deviation score
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

export const ANOMALIES_SUMMARY = {
  total: 18,
  highSeverity: 4,
  mediumSeverity: 8,
  resolved: 6,
};

export const ANOMALY_TREND_DATA: AnomalyTrendPoint[] = [
  { date: "Sep 01", critical: 0, high: 1, medium: 2, low: 1 },
  { date: "Sep 02", critical: 1, high: 0, medium: 1, low: 2 },
  { date: "Sep 03", critical: 0, high: 1, medium: 2, low: 0 },
  { date: "Sep 04", critical: 0, high: 0, medium: 1, low: 1 },
  { date: "Sep 05", critical: 1, high: 1, medium: 2, low: 1 },
  { date: "Sep 06", critical: 0, high: 0, medium: 1, low: 0 },
  { date: "Sep 07", critical: 1, high: 1, medium: 3, low: 2 },
  { date: "Sep 08", critical: 2, high: 2, medium: 2, low: 1 },
  { date: "Sep 09", critical: 1, high: 1, medium: 2, low: 1 },
];

export const MOCK_ANOMALIES_LIST: AnomalyRecord[] = [
  {
    id: "ANOM-2026-901",
    entity: "EU Shipping Freight Cost / Unit",
    region: "EU-Central",
    product: "Logistics Freight Core",
    timestamp: "Sep 09, 2026 04:12",
    score: 4.85,
    reason_short: "Freight surcharge surge +66.4% above historical baseline",
    root_cause_notes: "Units were significantly above the 8-week historical average due to localized port congestion and emergency fuel surcharges imposed by regional maritime carriers.",
    evidence: {
      actualValue: "€48.60 / unit",
      expectedValue: "€29.20 / unit",
      deviationPercent: "+66.4%",
      zScore: 3.82,
      baselinePeriod: "8-Week Rolling Average",
    },
    related_metrics: ["EU Carrier Capacity Index", "Port Transit Lag Days", "Logistics Fuel Surcharge Index"],
    severity: "CRITICAL",
    status: "OPEN",
  },
  {
    id: "ANOM-2026-902",
    entity: "APAC Checkout Latency Spike",
    region: "APAC-South",
    product: "Enterprise Payment Gateway",
    timestamp: "Sep 08, 2026 22:30",
    score: 4.42,
    reason_short: "Payment gateway response latency exceeded 4.2 seconds",
    root_cause_notes: "Localized API gateway timeout in Singapore data center caused checkout session drops during peak promotional traffic.",
    evidence: {
      actualValue: "4.20 seconds",
      expectedValue: "1.10 seconds",
      deviationPercent: "+281.8%",
      zScore: 3.45,
      baselinePeriod: "30-Day Hourly P99 Baseline",
    },
    related_metrics: ["API Response P99 Latency", "Cart Abandonment Rate", "Gateway Retry Failures"],
    severity: "HIGH",
    status: "INVESTIGATING",
  },
  {
    id: "ANOM-2026-903",
    entity: "NA North Return Rate Anomaly",
    region: "NA-North",
    product: "Hardware Device Model-X",
    timestamp: "Sep 08, 2026 18:45",
    score: 4.15,
    reason_short: "Return rate spiked to 8.4% for batch SKU-8840",
    root_cause_notes: "Batch firmware version 2.1.0 contained a power-management bug causing premature battery drain reports from retail customers.",
    evidence: {
      actualValue: "8.40%",
      expectedValue: "3.10%",
      deviationPercent: "+170.9%",
      zScore: 3.12,
      baselinePeriod: "6-Month Product Return Median",
    },
    related_metrics: ["Firmware Telemetry Error Rate", "Customer Support Ticket Volume", "RMA Claims"],
    severity: "HIGH",
    status: "OPEN",
  },
  {
    id: "ANOM-2026-904",
    entity: "ETL Ingestion Queue Backlog",
    region: "Global Engine",
    product: "Database Ingestion Pipeline",
    timestamp: "Sep 08, 2026 14:10",
    score: 3.65,
    reason_short: "Staging table processing backlog exceeded 14k records",
    root_cause_notes: "Unindexed join query on `raw_normalized` during concurrent ETL job sync saturated read-replica memory pool.",
    evidence: {
      actualValue: "14,200 records",
      expectedValue: "1,500 records",
      deviationPercent: "+846.6%",
      zScore: 2.88,
      baselinePeriod: "Hourly Pipeline Queue Mean",
    },
    related_metrics: ["ETL Queue Depth", "PostgreSQL Connection Lock Time", "CPU Memory Utilization"],
    severity: "MEDIUM",
    status: "RESOLVED",
  },
  {
    id: "ANOM-2026-905",
    entity: "Discount Code Abuse Anomaly",
    region: "NA-East",
    product: "SaaS Subscription Tier B",
    timestamp: "Sep 07, 2026 11:00",
    score: 2.95,
    reason_short: "Partner promo code redeemed 1,240 times in 1 hour",
    root_cause_notes: "Promotional voucher link was shared on public tech forum without domain restriction validation.",
    evidence: {
      actualValue: "1,240 redemptions",
      expectedValue: "450 redemptions",
      deviationPercent: "+175.5%",
      zScore: 2.35,
      baselinePeriod: "Historical Promo Campaign Velocity",
    },
    related_metrics: ["Promo Code Velocity", "New Customer Acquisition Rate", "Average Order Value"],
    severity: "LOW",
    status: "RESOLVED",
  },
];
