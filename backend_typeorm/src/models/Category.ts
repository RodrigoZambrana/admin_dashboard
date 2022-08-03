export interface Category {
  id: number;
  name: string;
  image_url: string;
  sbcategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  image_url: string;
  category_id: number;
}
