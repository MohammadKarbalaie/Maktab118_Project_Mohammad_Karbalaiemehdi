/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';


type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([
    {
      id: 1,
      name: 'Velvet Sneaker',
      price: 20.0,
      image: 'https://readymadeui.com/images/product14.webp',
      size: 'MD',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Smart Watch Timex',
      price: 60.0,
      image: 'https://readymadeui.com/images/watch5.webp',
      size: 'SM',
      quantity: 1,
    },
    {
      id: 3,
      name: 'French Connection',
      price: 40.0,
      image: 'https://readymadeui.com/images/watch4.webp',
      size: 'LG',
      quantity: 1,
    },
    {
      id: 4,
      name: 'Smart Watch',
      price: 60.0,
      image: 'https://readymadeui.com/images/watch7.webp',
      size: 'LG',
      quantity: 1,
    },
  ]);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.5)] font-sans">
        <div className="w-full max-w-xl bg-white shadow-lg relative ml-auto h-screen">
          <div className="overflow-auto p-6 h-[calc(100vh-135px)]">
            <div className="flex items-center gap-4 text-gray-800">
              <h3 className="text-2xl font-bold flex-1">سبد خرید</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
                onClick={closeCart}
              >
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
              </svg>
            </div>

            <div className="space-y-4 mt-12">
              {cart.map((product) => (
                <div key={product.id} className="grid grid-cols-3 items-start gap-4">
                  <div className="col-span-2 flex items-start gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                      <img src={product.image} alt={product.name}  width={100} height={100} className="object-contain" />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-base max-sm:text-sm font-bold text-gray-800">{product.name}</h3>
                      <p className="text-xs font-semibold text-gray-500 mt-0.5">Size: {product.size}</p>

                      <button
                        type="button"
                        className="mt-6 font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                        onClick={() => removeItem(product.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                          <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" />
                          <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" />
                        </svg>
                        حذف
                      </button>
                    </div>
                  </div>

                  <div className="ml-auto">
                    <h4 className="text-lg max-sm:text-sm font-bold text-gray-800">${product.price.toFixed(2)}</h4>

                    <div className="mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md">
                      <button onClick={() => updateQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" />
                        </svg>
                      </button>

                      <span className="px-2">{product.quantity}</span>

                      <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                          <path d="M62 12c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-4 px-6 border-t border-gray-300 flex justify-between items-center">
            <div>
              <span className="text-xs font-semibold">:جمع مبلغ</span>
              <h4 className="font-bold text-lg">{subtotal.toFixed(3)} تومان  </h4>
            </div>

            <button
              type="button"
              className="bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-md"
              onClick={() => alert('Proceed to Checkout')}
            >
              تسویه حساب
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
