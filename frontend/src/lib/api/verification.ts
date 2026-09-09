import { isMockMode, apiFetch } from "./client";
import { InsightService, DetailedInsight } from "@/services/insight-service";

export const VerificationApi = {
  async getPendingInsights(): Promise<DetailedInsight[]> {
    if (isMockMode()) {
      return InsightService.getPendingInsights();
    }
    return apiFetch<DetailedInsight[]>("/api/insights/pending");
  },

  async getAllInsights(): Promise<DetailedInsight[]> {
    if (isMockMode()) {
      return InsightService.getAllInsights();
    }
    return apiFetch<DetailedInsight[]>("/api/insights/all");
  },

  async approveInsight(id: string, reviewer: string, note?: string): Promise<DetailedInsight> {
    if (isMockMode()) {
      return InsightService.approveInsight(id, reviewer, note);
    }
    return apiFetch<DetailedInsight>(`/api/insights/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ reviewer, note }),
    });
  },

  async rejectInsight(id: string, reviewer: string, note?: string): Promise<DetailedInsight> {
    if (isMockMode()) {
      return InsightService.rejectInsight(id, reviewer, note);
    }
    return apiFetch<DetailedInsight>(`/api/insights/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reviewer, note }),
    });
  },

  async updateInsightFinding(id: string, newFinding: string, reviewer: string): Promise<DetailedInsight> {
    if (isMockMode()) {
      return InsightService.updateInsightFinding(id, newFinding, reviewer);
    }
    return apiFetch<DetailedInsight>(`/api/insights/${id}/edit`, {
      method: "POST",
      body: JSON.stringify({ finding: newFinding, reviewer }),
    });
  },

  async addInsightComment(id: string, author: string, text: string): Promise<DetailedInsight> {
    if (isMockMode()) {
      return InsightService.addInsightComment(id, author, text);
    }
    return apiFetch<DetailedInsight>(`/api/insights/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ author, text }),
    });
  },

  async getVerificationHistory(): Promise<DetailedInsight[]> {
    if (isMockMode()) {
      return InsightService.getVerificationHistory();
    }
    return apiFetch<DetailedInsight[]>("/api/insights/history");
  },
};
