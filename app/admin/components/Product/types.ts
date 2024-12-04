export interface Product {
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
