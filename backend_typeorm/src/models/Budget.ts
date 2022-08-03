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
  id: number
  budget_id: number
  product_id: number
  width: number
  height?: number
  advance?: number
  quantity: number
  unit_cost: number
  additional_information: string
}

export enum Budget_status {
  PENDIENTE,
  RECHAZADO,
  ACEPTADO,
  EXPIRADO,
}
