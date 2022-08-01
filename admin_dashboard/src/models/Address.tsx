export interface Address {
  id: number
  adress: string
  customer_id: string
  city: string
  type: AddressType
}

export enum AddressType {
  PERSONAL,
  FACTURACION,
}
