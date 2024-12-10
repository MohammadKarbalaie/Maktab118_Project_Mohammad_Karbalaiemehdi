export interface IProduct {
  _id:string
  name: string;
  category: string;
  subcategory: string;
  price: string;
  quantity: string;
  brand: string;
  description: string;
  thumbnail: File | string | null; 
  images: File[]; 
}


export interface Product {
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  images: File[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string; 
}

export interface IAddProduct {
  name: string;
  brand: string;
  description: string;
  images: File[];
  subcategory: string;
  category: string;
}