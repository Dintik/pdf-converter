'use server'

import { PDFFormState } from '@/types/pdf'

export async function createPDF(
  prevState: PDFFormState,
  formData: FormData
): Promise<PDFFormState> {
  const text = formData.get('text') as string

  if (!text) {
    return { error: 'Text is required' }
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PDF_API_URL}/create-pdf?apiKey=${process.env.PDF_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      }
    )

    if (!response.ok) {
      return { error: 'Failed to create PDF' }
    }

    // Get the PDF blob
    const pdfBlob = await response.blob()
    return { pdfBlob }
  } catch {
    return { error: 'Failed to create PDF' }
  }
}
