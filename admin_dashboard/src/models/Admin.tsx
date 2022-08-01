import { Address } from './Address'

export interface Admin {
  id: number
  name: string
  email: string
  password: string
  address: Address
  phone: string
  image_url: string
  role: string
  joiningDate: Date
}
