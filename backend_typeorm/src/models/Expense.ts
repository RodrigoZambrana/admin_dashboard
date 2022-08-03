import { PaymentMethod } from './Payment'

export interface Expense {
  id: number
  amount: number
  payment_method: PaymentMethod
  created_date: Date
  type: ExpenseType
  additional_information: string
}

export enum ExpenseType {
  FIJO,
  VARIABLE,
}
