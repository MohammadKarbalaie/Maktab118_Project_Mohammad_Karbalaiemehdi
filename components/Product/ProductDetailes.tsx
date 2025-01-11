/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/redux/store";
import {
  addToCart,
  syncCartWithDatabase,
} from "../../app/redux/slices/cartSlice";
import { getProductById } from "../../services/product-service";
import { Product } from "../../types/product";
import { IProductById } from "../../types/product";

export interface ProductDetailsProps {
  productId: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const transformProduct = (
    data: IProductById["data"]["product"]
  ): Product => ({
    _id: data._id,
    name: data.name,
    category: data.category.name, 
    subcategory: data.subcategory.name, 
    price: data.price,
    quantity: data.quantity,
    brand: data.brand,
    description: data.description,
    thumbnail: data.thumbnail || null,
    images: data.images,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        const transformedProduct = transformProduct(
          fetchedProduct.data.product
        );
        setProduct(transformedProduct);
        setSelectedImage(transformedProduct.images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      dispatch(syncCartWithDatabase());
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-3xl font-extrabold text-indigo-700 py-6 mb-2">
          {product.name}
        </h2>
        <div className="bg-lime-500 inline-block py-1 px-4 rounded-full text-white mb-4">
          {product.category} / {product.subcategory}
        </div>
      </div>

      <div className="max-w-8xl items-center justify-center pb-10 px-4 md:flex md:flex-col lg:flex-col md:space-x-6">
        <div className="w-full h-full lg:w-1/2 flex mb-8 lg:mb-0">
          {selectedImage && (
            <img
              src={`http://localhost:8000/images/products/images/${selectedImage}`}
              alt={product.name}
              className="h-96 w-full object-contain rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105"
            />
          )}

          <div className="w-32 flex flex-col mr-8 gap-6 space-x-4 ">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 rounded-lg overflow-hidden transition-transform transform hover:scale-110 ${
                  selectedImage === img
                    ? "ring-4 ring-indigo-600"
                    : "ring-2 ring-gray-300"
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

        <div className="w-full lg:w-1/2 px-10 flex flex-col justify-center mt-8 py-6 lg:mt-0">
          <div className="text-gray-800 mb-4">
            <p className="text-md rounded-xl px-5 py-1 text-center bg-emerald-400 w-40 text-white mb-4">
              {product.brand}
            </p>
            <h3 className="text-xl font-bold mb-2">درباره محصول</h3>
            <p>{product.description}</p>
          </div>

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
