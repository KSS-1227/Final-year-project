import React from "react";
import { Database, Tag } from "lucide-react";
import { MetadataColumnSchema } from "@/lib/mock-data/quality";

interface SchemaMetadataTableProps {
  data: MetadataColumnSchema[];
}

export function SchemaMetadataTable({ data }: SchemaMetadataTableProps) {
  const getSemanticTagBadge = (tag: string) => {
    switch (tag) {
      case "identifier":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "monetary":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "timestamp":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "dimension":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "metric":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-50 text-purple-600">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Metadata Catalog Schema (`metadata_catalog`)</h3>
            <p className="text-[11px] text-slate-500">
              Registered columns, data types, nullability, and semantic tagging rules
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          Active Schema: `cleaned_sales_transactions`
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-semibold tracking-wider">
            <tr>
              <th className="p-3">Column Name</th>
              <th className="p-3">Data Type</th>
              <th className="p-3">Nullable</th>
              <th className="p-3">Cardinality</th>
              <th className="p-3">Semantic Tag</th>
              <th className="p-3 text-right">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            {data.map((col) => (
              <tr key={col.columnName} className="hover:bg-slate-50/70 transition-colors">
                <td className="p-3 font-mono font-bold text-slate-900">{col.columnName}</td>
                <td className="p-3 font-mono text-blue-700">{col.dataType}</td>
                <td className="p-3 font-mono">
                  {col.isNullable ? (
                    <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800 border border-amber-200">
                      NULLABLE
                    </span>
                  ) : (
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 border border-emerald-200">
                      NOT NULL
                    </span>
                  )}
                </td>
                <td className="p-3 font-mono text-slate-600">{col.cardinality}</td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase border ${getSemanticTagBadge(
                      col.semanticTag
                    )}`}
                  >
                    <Tag className="h-3 w-3" />
                    {col.semanticTag}
                  </span>
                </td>
                <td className="p-3 text-right text-slate-600 max-w-xs truncate">
                  {col.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
