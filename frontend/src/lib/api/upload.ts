import { apiFetch } from "./client";
import { UploadBatchResult, UploadPipelineStep } from "@/services/upload-service";

export const UploadApi = {
  async uploadFile(
    file: File,
    onStepUpdate?: (steps: UploadPipelineStep[]) => void
  ): Promise<UploadBatchResult> {
    const formData = new FormData();
    formData.append("file", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Upload failed with status ${res.status}`);
    }

    return (await res.json()) as UploadBatchResult;
  },
};
