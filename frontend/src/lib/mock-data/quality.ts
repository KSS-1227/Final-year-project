export interface QualityMetricSummary {
  currentScore: number;
  maxScore: number;
  status: "PASS" | "FLAG" | "REJECT";
  totalRows: number;
  validRows: number;
  rejectedRows: number;
}

export interface QualityComponentScore {
  name: "Completeness" | "Accuracy" | "Consistency" | "Timeliness";
  score: number; // 0 - 100
  target: number;
  description: string;
}

export interface QualityTrendPoint {
  date: string;
  batchId: string;
  score: number;
  target: number;
}

export interface QualityBatchRecord {
  batchId: string;
  fileName: string;
  uploadedAt: string;
  uploadedBy: string;
  rowCount: number;
  qualityScore: number;
  status: "PASS" | "FLAG" | "REJECT";
  rejectedCount: number;
}

export interface RejectedRecordSummary {
  id: string;
  reason: string;
  count: number;
  percentage: number;
  sampleValue: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
}

export interface MetadataColumnSchema {
  columnName: string;
  tableName: string;
  dataType: string;
  isNullable: boolean;
  cardinality: number | string;
  semanticTag: "identifier" | "monetary" | "timestamp" | "categorical" | "dimension" | "metric";
  description: string;
}

export const QUALITY_SUMMARY_DATA: QualityMetricSummary = {
  currentScore: 94,
  maxScore: 100,
  status: "PASS",
  totalRows: 240650,
  validRows: 227733,
  rejectedRows: 12917,
};

export const QUALITY_COMPONENTS_DATA: QualityComponentScore[] = [
  {
    name: "Completeness",
    score: 98.2,
    target: 95.0,
    description: "Evaluates null or missing required values across staging columns.",
  },
  {
    name: "Accuracy",
    score: 95.8,
    target: 92.0,
    description: "Conformity to allowed domain ranges, formats, and type definitions.",
  },
  {
    name: "Consistency",
    score: 96.1,
    target: 90.0,
    description: "Cross-table foreign key referential integrity and schema matching.",
  },
  {
    name: "Timeliness",
    score: 92.4,
    target: 85.0,
    description: "Data freshness score calculated relative to batch arrival timestamp.",
  },
];

export const QUALITY_TREND_DATA: QualityTrendPoint[] = [
  { date: "Aug 20", batchId: "BATCH-0880", score: 88.5, target: 90.0 },
  { date: "Aug 24", batchId: "BATCH-0885", score: 91.2, target: 90.0 },
  { date: "Aug 28", batchId: "BATCH-0890", score: 89.8, target: 90.0 },
  { date: "Sep 01", batchId: "BATCH-0895", score: 95.4, target: 90.0 },
  { date: "Sep 04", batchId: "BATCH-0898", score: 98.1, target: 90.0 },
  { date: "Sep 07", batchId: "BATCH-0899", score: 64.2, target: 90.0 },
  { date: "Sep 08", batchId: "BATCH-0901", score: 96.4, target: 90.0 },
  { date: "Sep 09", batchId: "BATCH-0902", score: 91.8, target: 90.0 },
];

export const QUALITY_BATCH_HISTORY: QualityBatchRecord[] = [
  {
    batchId: "BATCH-2026-0902",
    fileName: "Global_SupplyChain_Logistics_Aug2026.csv",
    uploadedAt: "Sep 09, 2026 09:15",
    uploadedBy: "Logistics Admin",
    rowCount: 92450,
    qualityScore: 91.8,
    status: "PASS",
    rejectedCount: 7581,
  },
  {
    batchId: "BATCH-2026-0901",
    fileName: "Q3_Enterprise_Sales_Master.xlsx",
    uploadedAt: "Sep 08, 2026 14:32",
    uploadedBy: "Operations Analyst",
    rowCount: 148200,
    qualityScore: 96.4,
    status: "PASS",
    rejectedCount: 5336,
  },
  {
    batchId: "BATCH-2026-0899",
    fileName: "Legacy_ERP_Financial_Export_v2.xlsx",
    uploadedAt: "Sep 07, 2026 11:20",
    uploadedBy: "Finance Analyst",
    rowCount: 12400,
    qualityScore: 64.2,
    status: "REJECT",
    rejectedCount: 4439,
  },
  {
    batchId: "BATCH-2026-0898",
    fileName: "APAC_Regional_Transactions.csv",
    uploadedAt: "Sep 06, 2026 18:40",
    uploadedBy: "Regional Data Engine",
    rowCount: 210500,
    qualityScore: 98.1,
    status: "PASS",
    rejectedCount: 3999,
  },
  {
    batchId: "BATCH-2026-0895",
    fileName: "Telemetry_Events_Daily_Export.csv",
    uploadedAt: "Sep 04, 2026 23:10",
    uploadedBy: "Telemetry Pipeline",
    rowCount: 54000,
    qualityScore: 88.5,
    status: "FLAG",
    rejectedCount: 6210,
  },
];

export const REJECTS_SUMMARY: RejectedRecordSummary[] = [
  {
    id: "REJ-01",
    reason: "Missing Mandatory Customer Tax Identification (Null Value)",
    count: 5336,
    percentage: 41.3,
    sampleValue: "tax_id: NULL in row #14,208",
    severity: "HIGH",
  },
  {
    id: "REJ-02",
    reason: "Unrecognized Carrier Logistics Code (Schema Mismatch)",
    count: 4210,
    percentage: 32.6,
    sampleValue: "carrier_code: 'EXP-99' (Not in metadata lookup)",
    severity: "HIGH",
  },
  {
    id: "REJ-03",
    reason: "Out-of-Range Negative Monetary Value",
    count: 2100,
    percentage: 16.3,
    sampleValue: "transaction_amount: -$450.00",
    severity: "MEDIUM",
  },
  {
    id: "REJ-04",
    reason: "Duplicate Primary Key Violation",
    count: 1271,
    percentage: 9.8,
    sampleValue: "txn_id: 'TXN-9988421' already exists in DB",
    severity: "LOW",
  },
];

export const METADATA_CATALOG_SCHEMA: MetadataColumnSchema[] = [
  {
    columnName: "transaction_id",
    tableName: "cleaned_sales_transactions",
    dataType: "VARCHAR(36)",
    isNullable: false,
    cardinality: "148,200 (Unique)",
    semanticTag: "identifier",
    description: "Primary key assigned post-deduplication.",
  },
  {
    columnName: "transaction_amount",
    tableName: "cleaned_sales_transactions",
    dataType: "DECIMAL(12,2)",
    isNullable: false,
    cardinality: "18,420 Distinct",
    semanticTag: "monetary",
    description: "Normalized monetary transaction value in local currency converted to USD.",
  },
  {
    columnName: "transaction_date",
    tableName: "cleaned_sales_transactions",
    dataType: "TIMESTAMPTZ",
    isNullable: false,
    cardinality: "2,400 Distinct",
    semanticTag: "timestamp",
    description: "ISO 8601 standardized UTC timestamp of event occurrence.",
  },
  {
    columnName: "region_code",
    tableName: "cleaned_sales_transactions",
    dataType: "VARCHAR(10)",
    isNullable: false,
    cardinality: "5 Distinct",
    semanticTag: "dimension",
    description: "Standardized geographical reporting zone (e.g. NA-EAST, EU-CENTRAL).",
  },
  {
    columnName: "customer_tax_id",
    tableName: "cleaned_sales_transactions",
    dataType: "VARCHAR(20)",
    isNullable: true,
    cardinality: "12,150 Distinct",
    semanticTag: "identifier",
    description: "Validated corporate tax ID identifier.",
  },
  {
    columnName: "lead_time_days",
    tableName: "cleaned_supply_chain",
    dataType: "INTEGER",
    isNullable: true,
    cardinality: "45 Distinct",
    semanticTag: "metric",
    description: "Calculated lead time duration in days.",
  },
];
