'use client'

import { useState, useCallback, FC } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

interface ViewerProps {
  pdfBlob: Blob
}

const maxWidth = 1000

const PDFSkeleton = () => (
  <div className='flex justify-center p-8'>
    <div className='w-[1000px] h-[600px] bg-gray-100 rounded-lg animate-pulse' />
  </div>
)

const Viewer: FC<ViewerProps> = ({ pdfBlob }) => {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>()

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries
    if (entry) {
      setContainerWidth(entry.contentRect.width)
    }
  }, [])

  useResizeObserver(containerRef, {}, onResize)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <div className='flex flex-col items-center'>
      <div
        ref={setContainerRef}
        className='border-t border-gray-200 bg-white shadow-sm w-full'
      >
        <Document
          file={pdfBlob}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={PDFSkeleton}
          error={null}
        >
          {numPages && numPages > 1 && (
            <div className='flex items-center justify-center gap-2'>
              <button
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber <= 1}
                className='px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-600'
              >
                &lt;
              </button>
              <span className='text-gray-600'>
                {pageNumber} / {numPages}
              </span>
              <button
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber >= (numPages || 1)}
                className='px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:hover:text-gray-600'
              >
                &gt;
              </button>
            </div>
          )}
          <Page
            pageNumber={pageNumber}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
            loading={PDFSkeleton}
          />
        </Document>
      </div>
    </div>
  )
}

export default Viewer
