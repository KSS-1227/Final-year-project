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
  score: number;
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
