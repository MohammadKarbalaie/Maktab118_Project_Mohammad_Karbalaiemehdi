/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price) * (item.quantity),
    0
  );

  useEffect(() => {
   const cartState = localStorage.getItem("cartState");
    if (cartState) {
      setIsOpen(JSON.parse(cartState)); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(isOpen)); 
  }, [isOpen]);

  const closeCart = () => {
    setIsOpen(false); 
  };

  return (
    isOpen && (
      <div className="fixed font-vazir inset-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.5)]">
        <div className="w-full max-w-xl bg-white shadow-lg relative ml-auto h-screen">
          <button
            onClick={closeCart}
            className="absolute top-3 left-4 bg-red-500 text-white py-1 px-3"
          >
            X
          </button>
          
          <div className="overflow-auto p-6 h-[calc(100vh-135px)]">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-between">
              سبد خرید
            </h3>
            <div className="space-y-4 mt-12">
              {cart.map((product) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                      alt={product.name}
                      width={100}
                      className="object-cover rounded-md"
                    />
                    <div className="w-40">
                      <h4 className="line-clamp-1 ">{product.name}</h4>
                      <p>قیمت: {product.price} تومان</p>
                      <p>تعداد: {product.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        if ((product.quantity) > 1) {
                          updateQuantity(
                            product.name,
                            (product.quantity) - 1
                          );
                        }
                      }}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          product.name,
                          (product.quantity) + 1
                        )
                      }
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(product.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-6 px-6 border-t border-gray-300 my-6 flex justify-between items-center">
            <div className="flex gap-4 font-semibold">
              <span>جمع مبلغ: </span>
              <h4>{subtotal.toLocaleString()} تومان</h4>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white rounded-xl"
                onClick={clearCart}
              >
                پاک کردن سبد خرید
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-xl"
                // Logic for checkout
              >
                تکمیل خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Cart;
