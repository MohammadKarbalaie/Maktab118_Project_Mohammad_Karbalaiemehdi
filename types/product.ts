export interface ProductData {
  name: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: File | null;
  images: File[];
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: File | null;
  images: File[];
}

export interface ProductInOrder {
  product: IProduct | null; // مرتبط با محصول
  count: number; // تعداد محصول
  price: number; // قیمت محصول
}

export interface IOrder {
  _id: string; // شناسه سفارش
  user: string; // شناسه کاربر
  products: ProductInOrder[]; // لیست محصولات داخل سفارش
  totalPrice: number; // جمع کل مبلغ سفارش
  deliveryStatus: boolean; // وضعیت ارسال
  deliveryDate: string; // تاریخ ارسال
}

export interface GetProductsResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: IProduct[];
  };
}

export interface IProductById {
  data: {
    product: {
      _id: string;
      name: string;
      category: {
        name: string;
      };
      subcategory: {
        name: string;
      };
      price: number;
      quantity: number;
      brand: string;
      description: string;
      thumbnail: File | null;
      images: File[];
    };
  };
}


export interface IAddProduct {
  name: string;
  brand: string;
  subcategory: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  thumbnail: File | null;
  images: File[];
}

export interface Product {
  _id:string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail:File | null
  images: File[];
}

export interface AddProduct {
  name: string;
  brand: string;
  subcategory: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  thumbnail:File | null
  images: File[];
}