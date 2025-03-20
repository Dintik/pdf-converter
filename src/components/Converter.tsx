"use client";

import { TextForm } from "./TextForm";
import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { Navigation } from "./Navigation";

const Viewer = dynamic(() => import("./Viewer"), {
  ssr: false,
  loading: () => <div>Loading PDF viewer...</div>,
});

export const Converter = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const handleDownload = useCallback(() => {
    if (!pdfBlob) return;

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [pdfBlob]);

  return (
    <div className="flex flex-col">
      <Navigation
        onBackClick={pdfBlob ? () => setPdfBlob(null) : undefined}
        onDownloadClick={pdfBlob ? handleDownload : undefined}
      />

      <div>
        {pdfBlob ? (
          <Viewer pdfBlob={pdfBlob} />
        ) : (
          <TextForm onPdfCreated={setPdfBlob} />
        )}
      </div>
    </div>
  );
};
