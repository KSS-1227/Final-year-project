"use client";

import { useState, useEffect } from "react";
import { ScenariosApi } from "@/lib/api/scenarios";
import { SimulationResponse, ScenarioHistoryRecord } from "@/services/scenario-service";

export function useScenario(demandChangePercent = 20) {
  const [simulation, setSimulation] = useState<SimulationResponse | null>(null);
  const [history, setHistory] = useState<ScenarioHistoryRecord[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsSimulating(true);
    setError(null);

    ScenariosApi.simulateScenario(demandChangePercent / 100)
      .then((res) => {
        if (isMounted) {
          setSimulation(res);
          setIsSimulating(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Simulation request failed");
          setIsSimulating(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [demandChangePercent]);

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const data = await ScenariosApi.getScenarioHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load scenario history", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const saveCurrentScenario = async () => {
    if (!simulation) return;
    const name = `Demand ${demandChangePercent > 0 ? "+" : ""}${demandChangePercent}% Scenario`;
    await ScenariosApi.saveScenario(
      name,
      demandChangePercent,
      simulation.projected_demand,
      simulation.shortage
    );
    await loadHistory();
  };

  return { simulation, history, isSimulating, isLoadingHistory, error, saveCurrentScenario };
}
