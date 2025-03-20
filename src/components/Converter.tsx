'use client'

import { TextToPDFForm } from './TextToPDFForm'
import dynamic from 'next/dynamic'
import { useState, useCallback } from 'react'
import { Navigation } from './Navigation'
import { History } from './History'
import { db } from '@/db/db.model'
import { useLiveQuery } from 'dexie-react-hooks'

const Viewer = dynamic(() => import('./Viewer'), {
  ssr: false,
  loading: () => (
    <div className='border-t border-gray-200 bg-white'>
      <div className='flex justify-center p-8'>
        <div className='w-[1000px] h-[600px] bg-gray-100 rounded-lg animate-pulse' />
      </div>
    </div>
  )
})

export const Converter = () => {
  const [viewablePdfBlob, setViewablePdfBlob] = useState<Blob | null>(null)
  const pdfsHistory = useLiveQuery(() => db.pdfs.toArray())

  const downloadPdf = useCallback((blob: Blob) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'document.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  return (
    <div className='flex flex-col'>
      <Navigation
        onBackClick={
          viewablePdfBlob ? () => setViewablePdfBlob(null) : undefined
        }
        onDownloadClick={
          viewablePdfBlob ? () => downloadPdf(viewablePdfBlob) : undefined
        }
      />

      <div>
        {viewablePdfBlob ? (
          <Viewer pdfBlob={viewablePdfBlob} />
        ) : (
          <>
            <TextToPDFForm onPdfCreated={setViewablePdfBlob} />

            {pdfsHistory && pdfsHistory.length > 0 && (
              <History
                onSelectPdf={(blob) => setViewablePdfBlob(blob)}
                onDownloadPdf={(pdf) => downloadPdf(pdf.blob)}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
