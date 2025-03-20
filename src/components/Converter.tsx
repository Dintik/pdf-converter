"use client";

import { TextForm } from "./TextForm";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Navigation } from "./Navigation";

const Viewer = dynamic(() => import("./Viewer"), {
  ssr: false,
  loading: () => <div>Loading PDF viewer...</div>,
});

export const Converter = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  return (
    <div className="flex flex-col">
      <Navigation onBackClick={pdfBlob ? () => setPdfBlob(null) : null} />

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
