"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Check } from "lucide-react";
import { downloadCSV } from "@/lib/utils";

interface ExportCsvButtonProps<T extends Record<string, unknown>> {
  data: T[];
  filename?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "default" | "gold" | "secondary";
}

export function ExportCsvButton<T extends Record<string, unknown>>({
  data,
  filename = "export.csv",
  label = "Export CSV",
  size = "sm",
  variant = "outline",
}: ExportCsvButtonProps<T>) {
  const [downloaded, setDownloaded] = useState(false);

  const handleExport = () => {
    downloadCSV(data, filename);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      className="gap-1.5 transition-all"
    >
      {downloaded ? (
        <>
          <Check size={14} className="text-emerald-500" />
          <span>Exported</span>
        </>
      ) : (
        <>
          <Download size={14} />
          <span>{label}</span>
        </>
      )}
    </Button>
  );
}
