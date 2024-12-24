/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useCart } from "../../context/CartContext"; // کانتکست سبد خرید را وارد کنید

export interface ProductDetailsProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    brand: string;
    category: { name: string };
    subcategory: { name: string };
    images: File[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addToCart } = useCart(); // از کانتکست سبد خرید استفاده می‌کنیم
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // تابعی برای افزودن محصول به سبد خرید
  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity: 1,
      category: product.category.name, // اصلاح شده: به جای string، نام دسته‌بندی را استفاده کنید
      thumbnail: selectedImage, // اصلاح شده: thumbnail را به تصویر انتخابی انتساب می‌دهیم
      subcategory: product.subcategory.name, // اصلاح شده: فقط نام زیر دسته‌بندی را ارسال می‌کنیم
    });
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-3xl font-extrabold text-indigo-700 py-6 mb-2">{product.name}</h2>
        {/* Category and Subcategory */}
        <div className="bg-lime-500 inline-block py-1 px-4 rounded-full text-white mb-4">
          {product.category.name} / {product.subcategory.name}
        </div>
      </div>

      {/* Container for Image and Product Details */}
      <div className="max-w-8xl items-center justify-center pb-10 px-4 md:flex md:flex-col lg:flex-col md:space-x-6">
        {/* Image Gallery - Left section */}
        <div className="w-full h-full lg:w-1/2 flex mb-8 lg:mb-0">
          <img
            src={`http://localhost:8000/images/products/images/${selectedImage}`}
            alt={product.name}
            className="h-96 w-full object-contain rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105"
          />
          {/* Thumbnail images for selection - below the main image */}
          <div className="w-32 flex flex-col mr-8 gap-6 space-x-4 ">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 rounded-lg overflow-hidden transition-transform transform hover:scale-110 ${
                  selectedImage === img ? "ring-4 ring-indigo-600" : "ring-2 ring-gray-300"
                }`}
              >
                <img
                  src={`http://localhost:8000/images/products/images/${img}`}
                  alt={`Thumbnail ${index}`}
                  className="object-cover h-full w-full rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information - Right section */}
        <div className="w-full lg:w-1/2 px-10 flex flex-col justify-center mt-8 py-6 lg:mt-0">
          <div className="text-gray-800 mb-4">
          <p className="text-md rounded-xl px-5 py-1 text-center
           bg-emerald-400 w-40 text-white mb-4">{product.brand}</p>
            <h3 className="text-xl font-bold mb-2">درباره محصول</h3>
            <p>{product.description}</p>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between mt-8">
            <span className="text-2xl font-semibold text-indigo-700">
              {product.price.toLocaleString()} تومان
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
