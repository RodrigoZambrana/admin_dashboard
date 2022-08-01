import { Category } from './Category'
import { SubCategory } from './Category'

export interface Product {
  id: number
  title: string
  price: number
  former_price: number
  selling_unit: SellingUnit
  category_id: Category
  sub_category_id: SubCategory
  provider_name: ProviderName
  tags: string[]
  stock: number
  images: string[]
  description: string
  visible: boolean
  create_date: Date
  update_date: Date
  aditional_information: string
}

export interface offered_services {
  id: number
  service_name: string
  cost: number
  description: string
}

export enum SellingUnit {
  METROS_CUADRDADOS,
  METROS_LINEALES,
  UNIDAD,
}

export enum ProviderName {
  URUCORTINAS,
  VEROSOL,
  PROPERFIL,
  LIDASUR,
}
