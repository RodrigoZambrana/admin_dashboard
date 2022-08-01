export interface Category {
  id: number
  name: string
  image_url: string
  showing: boolean
  sbcategories: SubCategory[]
}

export interface SubCategory {
  id: number
  name: string
  image_url: string
  showing: boolean
}
