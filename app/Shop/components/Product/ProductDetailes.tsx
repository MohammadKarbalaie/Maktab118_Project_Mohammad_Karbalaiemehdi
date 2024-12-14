/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

export interface ProductDetailsProps {
    product: {
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
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
  
    return (
      <div className="bg-orange-50 pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{product.brand}</p>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:flex md:space-x-6">
          <div className="md:w-1/2">
            <img
              src={`http://localhost:8000/images/products/images/${selectedImage}`}
              alt={product.name}
              className="h-80 w-full object-cover rounded-lg mb-4"
            />
            <div className="flex gap-6 space-x-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-lg overflow-hidden ${
                    selectedImage === img ? "ring-2 ring-indigo-600" : ""
                  }`}
                >
                  <img
                    src={`http://localhost:8000/images/products/images/${img}`}
                    alt={`Thumbnail ${index}`}
                    className="object-cover h-full w-full"
                  />
                </button>
              ))}
            </div>
          </div>
  
          <div className="md:w-1/2 pr-10">
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-4">
              دسته‌بندی: {product.category.name} / {product.subcategory.name}
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-indigo-600">
                {product.price.toLocaleString()} تومان
              </span>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetails;
  
