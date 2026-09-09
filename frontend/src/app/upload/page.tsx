"use client";

import React, { useState } from "react";
import { UploadApi } from "@/lib/api/upload";
import {
  UploadPipelineStep,
  UploadBatchResult,
  INITIAL_PIPELINE_STEPS,
} from "@/services/upload-service";
import { FileDropzone } from "@/components/upload/file-dropzone";
import { PipelineStepper } from "@/components/upload/pipeline-stepper";
import { UploadResultCard } from "@/components/upload/upload-result-card";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [steps, setSteps] = useState<UploadPipelineStep[]>(INITIAL_PIPELINE_STEPS);
  const [result, setResult] = useState<UploadBatchResult | null>(null);

  const handleStartUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setResult(null);

    try {
      const batchResult = await UploadApi.uploadFile(
        selectedFile,
        (updatedSteps) => {
          setSteps([...updatedSteps]);
        }
      );
      setResult(batchResult);
    } catch (err) {
      console.error("Upload pipeline failed", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsUploading(false);
    setSteps(INITIAL_PIPELINE_STEPS.map((s) => ({ ...s, status: "WAITING" })));
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 uppercase">
              Member 1 Ingestion Contract
            </span>
            <span className="text-xs text-slate-400">• Consumes Service API Layer</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 tracking-tight">
            Upload Business Data
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload an Excel or CSV file to begin analysis.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: File Dropzone / Upload Result */}
        <div className="lg:col-span-7 space-y-6">
          {!result ? (
            <FileDropzone
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              onStartUpload={handleStartUpload}
              isUploading={isUploading}
            />
          ) : (
            <UploadResultCard result={result} onUploadAnother={handleReset} />
          )}
        </div>

        {/* Right Column: 7-Stage Pipeline Tracker */}
        <div className="lg:col-span-5">
          <PipelineStepper steps={steps} />
        </div>
      </div>
    </div>
  );
}
