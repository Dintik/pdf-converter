import Dexie, { Table } from 'dexie'

export interface PDFDocument {
  id?: number
  name: string
  blob: Blob
  date: Date
}

export class PDFDatabase extends Dexie {
  pdfs!: Table<PDFDocument>

  constructor() {
    super('PDFConverterDB')
    this.version(1).stores({
      pdfs: '++id, name, date'
    })
  }
}

export const db = new PDFDatabase()
