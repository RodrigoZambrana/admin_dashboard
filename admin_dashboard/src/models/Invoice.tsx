export interface invoice {
  id: number
  created_date: Date
  order_id: number
  additional_information: string
  status: InvoiceStatus
  invoice_entries: Invoice_entry[]
}

export interface Invoice_entry {
  id: number
  invoice_id: number
  product_name: string
  width?: number
  height?: number
  advance?: string
  length: number
  quantity: number
  unit_cost: number
  additional_information: string
}

export enum InvoiceStatus {
  PAGA,
  IMPAGA,
  CANCELADA,
}
