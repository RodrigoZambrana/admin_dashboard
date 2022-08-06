export interface Category {
  id: number
  name: string
  image_url: string
  sbcategories: ISubCategory[]
}

export interface ISubCategory {
  name: string
  description: string
  images: string[]
  image_url: string
  additional_information: string
}
