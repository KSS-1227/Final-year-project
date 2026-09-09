import { isMockMode, apiFetch } from "./client";
import { UploadService, UploadBatchResult, UploadPipelineStep } from "@/services/upload-service";

export const UploadApi = {
  async uploadFile(
    file: File,
    onStepUpdate?: (steps: UploadPipelineStep[]) => void
  ): Promise<UploadBatchResult> {
    if (isMockMode()) {
      return UploadService.uploadFileAndTriggerPipeline(file, onStepUpdate || (() => {}));
    }

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
