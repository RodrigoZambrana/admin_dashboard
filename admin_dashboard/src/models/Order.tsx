export interface Order {
  id: number
  customer_id: number
  created_date: Date
  advanced_payment: number
  sub_total: number /*Monto sin IVA*/
  production_cost: number /*Precio de costo*/
  discountPercentage: number
  additional_information: string
  status: OrderStatus
}

export enum OrderStatus {
  FINALIZADA,
  PENDIENTE_INSTALACION,
  CANCELADA,
}
