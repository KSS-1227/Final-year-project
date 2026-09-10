// Frontend API Service Abstraction for Insight Verification
// Conceptually maps to PostgreSQL `verified_insights` table and backend REST APIs.

export interface VerificationEvidence {
  historicalComparison: string;
  anomalyScore: number;
  relevantKPI: string;
  rootCause: string;
}

export interface ReviewComment {
  id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface DetailedInsight {
  id: string;
  title: string;
  finding: string;
  source: string; // e.g. "anomalies + metrics_store"
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  confidenceScore: number; // e.g. 94.2%
  createdAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "EDITED";
  verifiedBy?: string;
  verifiedAt?: string;
  evidence: VerificationEvidence;
  comments: ReviewComment[];
}

// In-Memory Data Store simulating backend state until REST API connection
let IN_MEMORY_INSIGHTS: DetailedInsight[] = [
  {
    id: "INS-2026-001",
    title: "EU Shipping Freight Cost Surcharge Offset Strategy",
    finding: "Product SKU-1042 experienced an abnormal demand increase paired with a +66.4% freight surcharge spike in EU-Central.",
    source: "anomalies + metrics_store",
    severity: "CRITICAL",
    confidenceScore: 94.2,
    createdAt: "Sep 09, 2026 10:15",
    status: "PENDING",
    evidence: {
      historicalComparison: "+66.4% freight cost surge vs 8-week baseline",
      anomalyScore: 4.85,
      relevantKPI: "EU Shipping Freight Cost / Unit (€48.60 vs €29.20)",
      rootCause: "Localized port congestion and emergency fuel surcharges imposed by regional maritime carriers.",
    },
    comments: [
      {
        id: "c1",
        author: "System",
        timestamp: "Sep 09, 10:15",
        text: "Automated insight generated from anomaly detection run #ANOM-2026-901.",
      },
    ],
  },
  {
    id: "INS-2026-002",
    title: "Pricing Expansion Indexation - APAC Enterprise Tier",
    finding: "Adjusting annual contract indexation by +4.5% in APAC-South yields projected +$1.8M ARR with less than 0.8% estimated churn impact.",
    source: "forecasts + scenarios",
    severity: "HIGH",
    confidenceScore: 89.5,
    createdAt: "Sep 09, 2026 12:30",
    status: "PENDING",
    evidence: {
      historicalComparison: "+4.5% ARR indexation vs 0.8% predicted churn",
      anomalyScore: 3.80,
      relevantKPI: "Net Revenue Retention (NRR) - 118.5%",
      rootCause: "Macro inflation trend aligned with enterprise contract renewal willingness.",
    },
    comments: [
      {
        id: "c2",
        author: "Regional Analyst",
        timestamp: "Sep 09, 13:00",
        text: "Requires review from VP of Global Sales before approval.",
      },
    ],
  },
  {
    id: "INS-2026-003",
    title: "Hardware Device Firmware 2.1.0 Sunset Recommendation",
    finding: "Device SKU-8840 experienced an abnormal return rate increase (8.4% vs 3.1% baseline) due to battery drain firmware bug.",
    source: "anomalies + quality_scores",
    severity: "HIGH",
    confidenceScore: 97.8,
    createdAt: "Sep 08, 2026 19:00",
    status: "APPROVED",
    verifiedBy: "Marcus Vance (VP Engineering)",
    verifiedAt: "Sep 09, 2026 08:45",
    evidence: {
      historicalComparison: "+170.9% return rate spike vs 6-month product median",
      anomalyScore: 4.15,
      relevantKPI: "Hardware Return Rate (8.4%)",
      rootCause: "Firmware version 2.1.0 power management loop bug.",
    },
    comments: [
      {
        id: "c3",
        author: "Marcus Vance",
        timestamp: "Sep 09, 08:45",
        text: "Approved patch deployment. Hotfix firmware v2.1.1 queued.",
      },
    ],
  },
  {
    id: "INS-2026-004",
    title: "ETL Query Optimization on `raw_normalized`",
    finding: "Unindexed join on staging table caused database query latency spike to 420ms.",
    source: "pipeline_logs + metrics_store",
    severity: "MEDIUM",
    confidenceScore: 92.1,
    createdAt: "Sep 07, 2026 14:10",
    status: "APPROVED",
    verifiedBy: "Elena Rostova (COO)",
    verifiedAt: "Sep 07, 2026 16:30",
    evidence: {
      historicalComparison: "281% latency spike above 110ms threshold",
      anomalyScore: 3.65,
      relevantKPI: "Database Read Replica Latency",
      rootCause: "Missing composite index on batch_id column during concurrent ingestion.",
    },
    comments: [],
  },
];

/**
 * Frontend Service Abstraction Layer for Insight APIs
 */
export const InsightService = {
  // GET /api/insights/pending
  async getPendingInsights(): Promise<DetailedInsight[]> {
    return IN_MEMORY_INSIGHTS.filter((i) => i.status === "PENDING");
  },

  // GET /api/insights/all
  async getAllInsights(): Promise<DetailedInsight[]> {
    return IN_MEMORY_INSIGHTS;
  },

  // GET /api/insights/:id
  async getInsightById(id: string): Promise<DetailedInsight | null> {
    return IN_MEMORY_INSIGHTS.find((i) => i.id === id) || null;
  },

  // POST /api/insights/:id/approve
  async approveInsight(id: string, reviewer: string, note?: string): Promise<DetailedInsight> {
    const item = IN_MEMORY_INSIGHTS.find((i) => i.id === id);
    if (!item) throw new Error(`Insight ${id} not found`);

    item.status = "APPROVED";
    item.verifiedBy = reviewer;
    item.verifiedAt = new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (note) {
      item.comments.push({
        id: `c-${Date.now()}`,
        author: reviewer,
        timestamp: "Just now",
        text: note,
      });
    }

    return { ...item };
  },

  // POST /api/insights/:id/reject
  async rejectInsight(id: string, reviewer: string, note?: string): Promise<DetailedInsight> {
    const item = IN_MEMORY_INSIGHTS.find((i) => i.id === id);
    if (!item) throw new Error(`Insight ${id} not found`);

    item.status = "REJECTED";
    item.verifiedBy = reviewer;
    item.verifiedAt = new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (note) {
      item.comments.push({
        id: `c-${Date.now()}`,
        author: reviewer,
        timestamp: "Just now",
        text: note,
      });
    }

    return { ...item };
  },

  // POST /api/insights/:id/edit
  async updateInsightFinding(id: string, newFinding: string, reviewer: string): Promise<DetailedInsight> {
    const item = IN_MEMORY_INSIGHTS.find((i) => i.id === id);
    if (!item) throw new Error(`Insight ${id} not found`);

    item.finding = newFinding;
    item.status = "EDITED";
    item.comments.push({
      id: `c-${Date.now()}`,
      author: reviewer,
      timestamp: "Just now",
      text: `Updated finding statement: "${newFinding}"`,
    });

    return { ...item };
  },

  // POST /api/insights/:id/comment
  async addInsightComment(id: string, author: string, text: string): Promise<DetailedInsight> {
    const item = IN_MEMORY_INSIGHTS.find((i) => i.id === id);
    if (!item) throw new Error(`Insight ${id} not found`);

    item.comments.push({
      id: `c-${Date.now()}`,
      author,
      timestamp: "Just now",
      text,
    });

    return { ...item };
  },

  // GET /api/insights/history
  async getVerificationHistory(): Promise<DetailedInsight[]> {
    return IN_MEMORY_INSIGHTS.filter((i) => i.status !== "PENDING");
  },
};
