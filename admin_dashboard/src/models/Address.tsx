export interface Address {
  id: number
  adress: string
  city: string
  type: AddressType
}

export enum AddressType {
  PERSONAL,
  FACTURACION,
}
