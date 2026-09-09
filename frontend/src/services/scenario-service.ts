// Frontend API Service Abstraction for What-If Decision Simulation Engine
// Maps to backend endpoint POST /api/scenarios/simulate and PostgreSQL `scenarios` table.

export interface SimulationRequest {
  demand_change: number; // e.g. 0.20 for +20%
}

export interface SimulationTimelinePoint {
  month: string;
  baseline: number;
  simulated: number;
}

export interface SimulationResponse {
  baseline_demand: number;
  demand_change: number;
  projected_demand: number;
  projected_inventory: number;
  shortage: number;
  recommendation: string;
  impact_timeline: SimulationTimelinePoint[];
}

export interface ScenarioHistoryRecord {
  id: string;
  name: string;
  createdAt: string;
  demandChangePercent: number;
  projectedDemand: number;
  shortageSurplus: number;
  status: "ACTIVE" | "SAVED" | "ARCHIVED";
}

let IN_MEMORY_SCENARIOS_HISTORY: ScenarioHistoryRecord[] = [
  {
    id: "SCEN-001",
    name: "Q4 Peak Season +20% Demand Surge",
    createdAt: "Sep 09, 2026 14:20",
    demandChangePercent: 20,
    projectedDemand: 12000,
    shortageSurplus: -3000, // shortage
    status: "ACTIVE",
  },
  {
    id: "SCEN-002",
    name: "Conservative Q4 Baseline (-5% Demand)",
    createdAt: "Sep 08, 2026 11:15",
    demandChangePercent: -5,
    projectedDemand: 9500,
    shortageSurplus: 500, // surplus
    status: "SAVED",
  },
  {
    id: "SCEN-003",
    name: "Aggressive Expansion (+35% Demand)",
    createdAt: "Sep 07, 2026 09:45",
    demandChangePercent: 35,
    projectedDemand: 13500,
    shortageSurplus: -4500,
    status: "SAVED",
  },
];

export const ScenarioService = {
  // POST /api/scenarios/simulate
  async simulateScenario(req: SimulationRequest): Promise<SimulationResponse> {
    // Simulating backend Stage 13 decision simulation engine endpoint response
    const baseline = 10000;
    const inventory = 9000;
    const change = req.demand_change;
    const projectedDemand = Math.round(baseline * (1 + change));
    const shortage = Math.max(0, projectedDemand - inventory);

    let recommendation = "";
    if (shortage > 0) {
      recommendation = `Increase inventory buffer by ${shortage.toLocaleString()} units before the projected demand increase to avoid stockouts.`;
    } else if (change < 0) {
      recommendation = `Inventory levels are sufficient. Consider reducing safety stock by ${Math.abs(inventory - projectedDemand).toLocaleString()} units to optimize holding costs.`;
    } else {
      recommendation = `Current inventory aligns with baseline demand projections. Maintain standard reorder triggers.`;
    }

    const impact_timeline: SimulationTimelinePoint[] = [
      { month: "Oct 2026", baseline: 10000, simulated: projectedDemand },
      { month: "Nov 2026", baseline: 10500, simulated: Math.round(projectedDemand * 1.05) },
      { month: "Dec 2026", baseline: 11000, simulated: Math.round(projectedDemand * 1.10) },
    ];

    // Artificial tiny async delay to simulate network call to API
    await new Promise((res) => setTimeout(res, 150));

    return {
      baseline_demand: baseline,
      demand_change: change,
      projected_demand: projectedDemand,
      projected_inventory: inventory,
      shortage,
      recommendation,
      impact_timeline,
    };
  },

  // GET /api/scenarios/history
  async getScenarioHistory(): Promise<ScenarioHistoryRecord[]> {
    return IN_MEMORY_SCENARIOS_HISTORY;
  },

  // POST /api/scenarios/save
  async saveScenario(name: string, demandChangePercent: number, projectedDemand: number, shortage: number): Promise<ScenarioHistoryRecord> {
    const record: ScenarioHistoryRecord = {
      id: `SCEN-00${IN_MEMORY_SCENARIOS_HISTORY.length + 1}`,
      name,
      createdAt: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      demandChangePercent,
      projectedDemand,
      shortageSurplus: shortage > 0 ? -shortage : 0,
      status: "SAVED",
    };
    IN_MEMORY_SCENARIOS_HISTORY.unshift(record);
    return record;
  },
};
