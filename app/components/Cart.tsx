"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { removeFromCart, updateCartItemQuantity, clearCart, syncCartWithDatabase } from '../redux/slices/cartSlice';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.cart.user);
  const router = useRouter();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
      dispatch(syncCartWithDatabase());
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    dispatch(syncCartWithDatabase());
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(syncCartWithDatabase());
  };

  const handleCheckout = () => {
    if (!user) {
      router.push('/auth/login');
    } else {
      router.push('/checkout');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">سبد خرید شما</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">سبد خرید شما خالی است.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between mb-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price.toLocaleString()} تومان</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleQuantityChange(item._id, item.cartQuantity - 1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="mx-2 font-medium">{item.cartQuantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, item.cartQuantity + 1)}
                    className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                  <button 
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-6 space-y-4">
              <p className="font-bold text-xl text-right">مجموع: {total.toLocaleString()} تومان</p>
              <button
                onClick={handleCheckout}
                className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                تکمیل خرید
              </button>
              <button 
                onClick={handleClearCart}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                پاک کردن سبد خرید
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

