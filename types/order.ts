import { ProductInOrder } from "./product";

export interface IOrder {
  _id: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
  }; 
  products: ProductInOrder[];
  totalPrice: number; 
  deliveryStatus: boolean;
  deliveryDate: string; 
}

  export interface Order {
    _id: string;
    user: string;
    totalPrice: number;
    deliveryDate: string;
    deliveryStatus: boolean;
    items: { name: string; price: number; quantity: number }[];  
  }
  