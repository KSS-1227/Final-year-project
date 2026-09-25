import { apiFetch } from "./client";
import { SimulationResponse, ScenarioHistoryRecord } from "@/services/scenario-service";

export const ScenariosApi = {
  async simulateScenario(demand_change: number): Promise<SimulationResponse> {
    return apiFetch<SimulationResponse>("/api/scenarios/simulate", {
      method: "POST",
      body: JSON.stringify({ demand_change }),
    });
  },

  async getScenarioHistory(): Promise<ScenarioHistoryRecord[]> {
    return apiFetch<ScenarioHistoryRecord[]>("/api/scenarios/history");
  },

  async saveScenario(
    name: string,
    demandChangePercent: number,
    projectedDemand: number,
    shortage: number
  ): Promise<ScenarioHistoryRecord> {
    return apiFetch<ScenarioHistoryRecord>("/api/scenarios/save", {
      method: "POST",
      body: JSON.stringify({ name, demandChangePercent, projectedDemand, shortage }),
    });
  },
};
