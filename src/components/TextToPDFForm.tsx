'use client'

import { useActionState } from 'react'
import { createPDF } from '@/actions/pdf'
import { useEffect } from 'react'
import { PDFFormState } from '@/types/pdf'
import { db } from '@/db/db.model'

const initialState: PDFFormState = {}

interface TextToPDFFormProps {
  onPdfCreated: (blob: Blob) => void
}

export const TextToPDFForm = ({ onPdfCreated }: TextToPDFFormProps) => {
  const [state, formAction, isPending] = useActionState(createPDF, initialState)

  useEffect(() => {
    if (state.pdfBlob) {
      const pdfBlob = state.pdfBlob
      // Save PDF to history and then show it
      db.pdfs
        .add({
          name: 'document.pdf',
          blob: pdfBlob,
          date: new Date()
        })
        .then(() => {
          onPdfCreated(pdfBlob)
        })
    }
  }, [state.pdfBlob, onPdfCreated])

  return (
    <div>
      <form action={formAction} data-testid='pdf-form'>
        <div className='w-full  bg-gray-50'>
          <div className='bg-white p-4 border-t border-gray-200'>
            <label
              htmlFor='comment'
              className='block p-2 text-sm text-gray-700'
            >
              Enter text to convert to PDF
            </label>
            <textarea
              id='comment'
              name='text'
              rows={16}
              className='w-full p-2 text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md'
              placeholder='Enter text...'
              required
            ></textarea>
          </div>
          <div className='flex items-center justify-center p-4 border-t border-gray-200'>
            <button
              type='submit'
              disabled={isPending}
              className='px-4 py-2 text-sm font-semibold text-white bg-blue-700 rounded-lg focus:ring-2 focus:ring-blue-500 hover:bg-blue-800 disabled:opacity-50 cursor-pointer'
            >
              {isPending ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        </div>
      </form>
      {state.error && (
        <p className='mt-2 text-sm text-red-600'>{state.error}</p>
      )}
    </div>
  )
}
