import { Address } from './Address'

export interface Admin {
  id: number
  name: string
  address: Address
  image_url: string
  email: string
  password: string
  phone: string
  role: string
  joiningDate: Date
}
