// export interface Order {
//     _id: string;
//     user: string;   
//     totalPrice: number;
//     deliveryDate: string;
//     deliveryStatus: boolean;
//   }

  export interface Order {
    _id: string;
    user: string;
    totalPrice: number;
    deliveryDate: string;
    deliveryStatus: boolean;
    items: { name: string; price: number; quantity: number }[]; // این خط اضافه شده است
  }
  