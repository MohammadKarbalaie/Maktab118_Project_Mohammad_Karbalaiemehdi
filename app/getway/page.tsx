"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { clearCart, CartItem } from '../redux/slices/cartSlice';
import axios from 'axios';

const GatewayPage = () => {
  const [captcha, setCaptcha] = useState<string>("");
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string[]>(["", "", "", ""]);
  const [expiryMonth, setExpiryMonth] = useState<string>("");
  const [expiryYear, setExpiryYear] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.cart.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const newCaptcha = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCaptcha(newCaptcha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      if (!user || !user._id) {
        throw new Error('اطلاعات کاربر یافت نشد. لطفاً دوباره وارد شوید.');
      }

      if (cartItems.length === 0) {
        throw new Error('سبد خرید شما خالی است.');
      }

      const orderData = {
        user: user._id,
        products: cartItems.map((item: CartItem) => ({
          product: item._id,
          count: item.cartQuantity
        })),
        deliveryStatus: false
      };

      console.log('Order data being sent:', JSON.stringify(orderData, null, 2));

      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(clearCart());
        // Clear cart from database
        await axios.delete(`/api/cart?userId=${user._id}`);
        router.push(`/thank-you?orderId=${result.orderId}`);
      } else {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error('خطا در ثبت سفارش. لطفاً با پشتیبانی تماس بگیرید.');
      }
    } catch (error) {
      console.error('خطا در ثبت سفارش:', error);
      alert(error instanceof Error ? error.message : 'خطا در ثبت سفارش');
      router.push('/payment?status=failure');
    }
  };

  const handleCancel = () => {
    if (confirm("آیا از انصراف خود مطمئن هستید؟")) {
      router.push('/payment?status=cancel');
    }
  };

  return (
    <div className="flex flex-col items-center text-lg font-medium bg-gray-50 min-h-screen py-10">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 bg-gray-100">
          <div className="text-sm font-semibold text-gray-700">پرداخت الکترونیک سپهر</div>
        </div>

        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">شماره کارت</label>
              <div className="flex space-x-2">
                {cardNumber.map((num, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={4}
                    value={num}
                    onChange={(e) =>
                      setCardNumber((prev) =>
                        prev.map((n, i) => (i === index ? e.target.value : n))
                      )
                    }
                    className="w-1/4 p-2 border border-gray-300 rounded-md text-center focus:ring focus:ring-blue-200"
                    placeholder="####"

                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاریخ انقضا</label>
                <div className="flex space-x-2 gap-2">
                  <input
                    type="text"
                    maxLength={2}
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-md text-center focus:ring focus:ring-blue-200"
                    placeholder="ماه"

                  />
                  <input
                    type="text"
                    maxLength={4}
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    className="w-24 p-2 border border-gray-300 rounded-md text-center focus:ring focus:ring-blue-200"
                    placeholder="سال"

                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  maxLength={4}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">کد امنیتی</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  placeholder="کد امنیتی را وارد کنید"
              
                />
                <span className="text-lg font-bold text-gray-800 bg-gray-100 px-4 py-2 rounded-md">{captcha}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رمز دوم</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
    
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
              >
                پرداخت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GatewayPage;

