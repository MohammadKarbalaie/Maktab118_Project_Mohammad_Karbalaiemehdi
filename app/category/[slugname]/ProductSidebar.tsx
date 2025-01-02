/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../../../types/category";
import { ISubcategory } from "../../../types/subcategory";
import Link from "next/link";
import { BiBasket } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchProducts, addToCart, Product } from '../../redux/slices/cartSlice';

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<ISubcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.cart.products);
  const status = useSelector((state: RootState) => state.cart.status);
  
  const apiUrl = "http://localhost:8000/api";

  useEffect(() => {
    axios
      .get(`${apiUrl}/categories`)
      .then((response) => {
        setCategories(response.data.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiUrl}/subcategories`)
      .then((response) => {
        setSubcategories(response.data.data.subcategories);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = subcategories.filter(
        (subcategory) => subcategory.category === selectedCategory
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, subcategories]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product: Product) => {
    const categoryMatch = selectedCategory
      ? product.category === selectedCategory
      : true;
    const subcategoryMatch = selectedSubcategory
      ? product.subcategory === selectedSubcategory
      : true;
    return categoryMatch && subcategoryMatch;
  });

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-6/6 flex gap-8">
      <div className="w-1/6 border p-4 m-4">
        <h2>دسته‌بندی‌ها</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="my-2">
              <div
                onClick={() => setSelectedCategory(category._id)}
                className="cursor-pointer p-2 border-b"
              >
                {category.name}
              </div>
              {selectedCategory === category._id && (
                <ul className="ml-4 mt-2">
                  {filteredSubcategories
                    .filter((sub) => sub.category === category._id)
                    .map((subcategory) => (
                      <li
                        key={subcategory._id}
                        onClick={() => setSelectedSubcategory(subcategory._id)}
                        className="cursor-pointer p-1 border-b"
                      >
                        {subcategory.name}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-5/6">
        <h1 className="text-3xl">محصولات</h1>
        <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="product-card bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              >
                <Link href={`/product/${product._id}`} className="block">
                  <img
                    src={`http://localhost:8000/images/products/images/${product.images[0]}`}
                    alt={product.name}
                    className="product-image w-full h-60"
                  />
                </Link>
                <div className="product-info p-4">
                  <h4 className="product-name text-xl font-semibold text-gray-800">
                    {product.name}
                  </h4>
                  <div className="flex justify-between">
                    <p className="product-price text-lg font-semibold text-teal-500 mt-4">
                      قیمت: {product.price} تومان
                    </p>
                    <button
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 flex items-center"
                      onClick={() => handleAddToCart(product)}
                    >
                      <BiBasket className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>هیچ محصولی برای نمایش یافت نشد</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

