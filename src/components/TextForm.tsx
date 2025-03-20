"use client";

import { useActionState } from "react";
import { createPDF } from "@/actions/pdf";
import { useEffect, useState } from "react";
import { PDFFormState } from "@/types/pdf";

const initialState: PDFFormState = {};

export const TextForm = () => {
  const [state, formAction, isPending] = useActionState(
    createPDF,
    initialState
  );
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (state.pdfBlob) {
      const url = URL.createObjectURL(state.pdfBlob);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [state.pdfBlob]);

  return (
    <div>
      <form action={formAction}>
        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
          <div className="p-4 bg-white">
            <label
              htmlFor="comment"
              className="block p-2 text-sm text-gray-700"
            >
              Enter the text you want to convert to PDF
            </label>
            <textarea
              id="comment"
              name="text"
              rows={16}
              className="w-full p-2 text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
              placeholder="Write a text..."
              // required
            ></textarea>
          </div>
          <div className="flex items-center justify-center p-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 disabled:opacity-50"
            >
              {isPending ? "Converting..." : "Convert to PDF"}
            </button>
          </div>
        </div>
      </form>
      {state.error && (
        <p className="mt-2 text-sm text-red-600">{state.error}</p>
      )}
      {pdfUrl && (
        <div className="mt-4">
          <a
            href={pdfUrl}
            download="document.pdf"
            className="mt-2 inline-block px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};
