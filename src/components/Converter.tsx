"use client";

import { TextForm } from "./TextForm";
import dynamic from "next/dynamic";
import { useState } from "react";

const Viewer = dynamic(() => import("./Viewer"), {
  ssr: false,
  loading: () => <div>Loading PDF viewer...</div>,
});

export const Converter = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  return (
    <div>
      {pdfBlob ? (
        <Viewer pdfBlob={pdfBlob} />
      ) : (
        <TextForm onPdfCreated={setPdfBlob} />
      )}
    </div>
  );
};
