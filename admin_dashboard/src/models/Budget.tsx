export interface Budget {
  id: number
  customer_id?: number
  customer_name: string
  customer_telephone: string
  customer_email: string
  customer_address: string
  created_date: Date
  discount_percentage: number
  valid_days: number
  budget_status: Budget_status
  budget_entries: Budget_entry[]
}

export interface Budget_entry {
  budget_id: number
  product_id: number
  width: number
  height?: number
  advance?: number
}

export enum Budget_status {
  PENDIENTE,
  RECHAZADO,
  ACEPTADO,
  EXPIRADO,
}
