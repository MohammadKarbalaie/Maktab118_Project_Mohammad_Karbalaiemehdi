export interface Order {
    _id: string;
    user: string;   
    totalPrice: number;
    deliveryDate: string;
    deliveryStatus: boolean;
  }