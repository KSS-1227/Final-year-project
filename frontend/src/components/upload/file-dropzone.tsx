"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet, FileText, X, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface FileDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onStartUpload: () => void;
  isUploading: boolean;
}

export function FileDropzone({
  selectedFile,
  onFileSelect,
  onStartUpload,
  isUploading,
}: FileDropzoneProps) {
  const { error: toastError, info } = useToast();
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!["xlsx", "xls", "csv"].includes(extension || "")) {
      const msg = "Unsupported file type. Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.";
      setErrorMessage(msg);
      toastError("Invalid File Format", msg);
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      const msg = "File exceeds maximum allowed size of 50 MB.";
      setErrorMessage(msg);
      toastError("File Too Large", msg);
      return;
    }

    onFileSelect(file);
    info("File Selected", `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleKeyDownDropzone = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-2xs space-y-4">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Upload Business Data</h3>
        <p className="text-[11px] text-slate-500">
          Upload an Excel or CSV file to trigger ingestion, validation & quality scoring.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            validateAndSetFile(e.target.files[0]);
          }
        }}
      />

      {/* Drag & Drop Zone */}
      {!selectedFile ? (
        <div
          tabIndex={0}
          role="button"
          aria-label="Upload data file dropzone"
          onKeyDown={handleKeyDownDropzone}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed p-10 text-center cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            isDragOver
              ? "border-blue-500 bg-blue-50/50"
              : "border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400"
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3">
            <UploadCloud className="h-6 w-6" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">
            Drag and drop your spreadsheet here, or <span className="text-blue-600 underline">browse</span>
          </h4>
          <p className="mt-1 text-[11px] text-slate-500">
            Supported formats: <strong className="text-slate-700">.xlsx, .xls, .csv</strong> (Max size: 50 MB)
          </p>
        </div>
      ) : (
        /* Selected File Card */
        <div className="rounded-md border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-emerald-100 text-emerald-700">
              {selectedFile.name.endsWith(".csv") ? (
                <FileText className="h-5 w-5" />
              ) : (
                <FileSpreadsheet className="h-5 w-5" />
              )}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 truncate max-w-sm">
                {selectedFile.name}
              </h4>
              <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5 font-mono">
                <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                <span>•</span>
                <span className="uppercase text-blue-700 font-semibold">
                  {selectedFile.name.split(".").pop()}
                </span>
              </div>
            </div>
          </div>

          {!isUploading && (
            <button
              onClick={() => onFileSelect(null)}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-800 transition-colors focus:ring-1 focus:ring-blue-600"
              title="Remove file"
              aria-label="Remove selected file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Error Message Alert */}
      {errorMessage && (
        <div className="flex items-center space-x-2 text-rose-700 bg-rose-50 border border-rose-200 p-3 rounded text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Trigger Button */}
      {selectedFile && !isUploading && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onStartUpload}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-2xs focus:ring-1 focus:ring-blue-600"
          >
            <UploadCloud className="h-4 w-4" />
            Upload & Trigger Pipeline
          </button>
        </div>
      )}
    </div>
  );
}

