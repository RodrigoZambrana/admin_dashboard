export interface Order {
  id: number
  customer_id: number
  budget_id: number
  advanced_payment: number //seña
  sub_total: number /*Monto sin IVA*/
  production_cost: number /*Precio de costo*/
  discountPercentage: number
  additional_information: string
  status: OrderStatus
  order_entries: Order_entries
  created_date: Date
}

export interface Order_entries {
  id: number
  product_id: number
  length?: number
  width?: number
  height?: number
  advance?: number
  quantity: number
  unit_cost: number
  additional_information: string
}

export enum OrderStatus {
  FINALIZADA,
  PENDIENTE_INSTALACION,
  CANCELADA,
}
