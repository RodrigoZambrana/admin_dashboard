export interface Payment {
  id: number
  order_id: number
  invoice_id: number
  amount: number
  payment_method: PaymentMethod
  created_date: Date
  status: PaymentStatus
  additional_information: string
}

export enum PaymentStatus {
  APROBADO,
  PENDIENTE,
  CANCELADO,
  RECHAZADO,
}

export enum PaymentMethod {
  EFECTIVO,
  CHEQUE,
  MERCADO_PAGO,
  TRANSFERENCIA,
}
