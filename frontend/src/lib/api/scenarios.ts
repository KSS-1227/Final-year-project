import { isMockMode, apiFetch } from "./client";
import { ScenarioService, SimulationResponse, ScenarioHistoryRecord } from "@/services/scenario-service";

export const ScenariosApi = {
  async simulateScenario(demand_change: number): Promise<SimulationResponse> {
    if (isMockMode()) {
      return ScenarioService.simulateScenario({ demand_change });
    }
    return apiFetch<SimulationResponse>("/api/scenarios/simulate", {
      method: "POST",
      body: JSON.stringify({ demand_change }),
    });
  },

  async getScenarioHistory(): Promise<ScenarioHistoryRecord[]> {
    if (isMockMode()) {
      return ScenarioService.getScenarioHistory();
    }
    return apiFetch<ScenarioHistoryRecord[]>("/api/scenarios/history");
  },

  async saveScenario(
    name: string,
    demandChangePercent: number,
    projectedDemand: number,
    shortage: number
  ): Promise<ScenarioHistoryRecord> {
    if (isMockMode()) {
      return ScenarioService.saveScenario(name, demandChangePercent, projectedDemand, shortage);
    }
    return apiFetch<ScenarioHistoryRecord>("/api/scenarios/save", {
      method: "POST",
      body: JSON.stringify({ name, demandChangePercent, projectedDemand, shortage }),
    });
  },
};
