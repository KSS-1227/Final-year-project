import { apiFetch } from "./client";
import { DetailedInsight } from "@/services/insight-service";

export const VerificationApi = {
  async getPendingInsights(): Promise<DetailedInsight[]> {
    return apiFetch<DetailedInsight[]>("/api/insights/pending");
  },

  async getAllInsights(): Promise<DetailedInsight[]> {
    return apiFetch<DetailedInsight[]>("/api/insights/all");
  },

  async approveInsight(id: string, reviewer: string, note?: string): Promise<DetailedInsight> {
    return apiFetch<DetailedInsight>(`/api/insights/${id}/approve`, {
      method: "POST",
      body: JSON.stringify({ reviewer, note }),
    });
  },

  async rejectInsight(id: string, reviewer: string, note?: string): Promise<DetailedInsight> {
    return apiFetch<DetailedInsight>(`/api/insights/${id}/reject`, {
      method: "POST",
      body: JSON.stringify({ reviewer, note }),
    });
  },

  async updateInsightFinding(id: string, newFinding: string, reviewer: string): Promise<DetailedInsight> {
    return apiFetch<DetailedInsight>(`/api/insights/${id}/edit`, {
      method: "POST",
      body: JSON.stringify({ finding: newFinding, reviewer }),
    });
  },

  async addInsightComment(id: string, author: string, text: string): Promise<DetailedInsight> {
    return apiFetch<DetailedInsight>(`/api/insights/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ author, text }),
    });
  },

  async getVerificationHistory(): Promise<DetailedInsight[]> {
    return apiFetch<DetailedInsight[]>("/api/insights/history");
  },
};
