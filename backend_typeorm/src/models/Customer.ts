import { Address } from './Address'

export interface Customer {
  id: number
  full_name: string
  email: string
  telephone: string
  address: Address[]
}
