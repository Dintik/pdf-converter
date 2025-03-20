'use client'

import { useLiveQuery } from 'dexie-react-hooks'
import { PDFDocument, db } from '@/db/db.model'
import Image from 'next/image'
import DownloadIcon from '@/assets/images/Download.png'
import PDFIcon from '@/assets/images/PDF.jpg'

interface HistoryProps {
  onSelectPdf: (blob: Blob) => void
  onDownloadPdf: (pdf: PDFDocument) => void
}

export const History = ({ onSelectPdf, onDownloadPdf }: HistoryProps) => {
  const pdfs = useLiveQuery(() =>
    db.pdfs
      .toArray()
      .then((pdfs) =>
        pdfs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      )
  )

  return (
    <div className='border-t border-gray-200 bg-white p-4'>
      <h2 className='text-xl font-semibold mb-4'>Conversion History</h2>
      <div className='space-y-4'>
        {pdfs?.map((pdf) => (
          <div
            key={pdf.id}
            className='p-4 border rounded-lg hover:bg-gray-50 cursor-pointer'
            onClick={() => onSelectPdf(pdf.blob)}
          >
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 items-center'>
              <div className='flex items-center gap-2'>
                <Image src={PDFIcon} alt='PDF' width={28} height={28} />
                <p className='text-sm text-gray-500'>
                  {new Date(pdf.date).toLocaleString()}
                </p>
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDownloadPdf(pdf)
                  }}
                  className='flex items-center justify-center px-4 py-2 bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors text-white cursor-pointer'
                >
                  <Image
                    src={DownloadIcon}
                    alt='Download'
                    width={24}
                    height={24}
                    className='brightness-0 invert'
                  />
                </button>
                <button
                  onClick={async (e) => {
                    e.stopPropagation()
                    await db.pdfs.delete(pdf.id!)
                  }}
                  className='flex items-center justify-center px-4 py-2 bg-red-600 rounded-md shadow-sm hover:bg-red-700 transition-colors text-white cursor-pointer'
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
