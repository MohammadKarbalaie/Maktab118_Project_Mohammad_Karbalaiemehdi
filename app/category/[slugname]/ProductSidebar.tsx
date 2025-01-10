/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice"; 
import { getProductsByCategoryId } from "../../../services/product-service"; 
import { Product } from "../../../types/product";
import { Category } from "../../../types/category"; 
import { ISubcategory } from "../../../types/subcategory"; 
import { BiBasket } from "react-icons/bi";
import Link from "next/link";

const ProductsWithSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const apiUrl = "http://localhost:8000/api";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories`);
        const data = await response.json();
        setCategories(data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/subcategories`);
        const data = await response.json();
        setSubcategories(data.data.subcategories);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const fetchProducts = async (categoryId: string, subcategoryId: string) => {
    setLoading(true);
    try {
      const response = await getProductsByCategoryId(categoryId, 1, 10);
      console.log("API Response:", response);
      const products = response?.products || []; 
      setProducts(
        subcategoryId
          ? products.filter(
              (product: { subcategory: string }) =>
                product.subcategory === subcategoryId
            )
          : products
      );
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); 
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    fetchProducts(categoryId, "");
  };
  const handleSubcategoryClick = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    fetchProducts(selectedCategory, subcategoryId);
  };
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex">
      <div className="w-80 border-r p-4">
        <h2 className="text-xl font-bold mb-4">دسته‌بندی‌ها</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className="mb-2">
              <div
                className={`cursor-pointer p-2 ${
                  selectedCategory === category._id ? "bg-gray-200" : ""
                }`}
                onClick={() => handleCategoryClick(category._id)}
              >
                {category.name}
              </div>
              {selectedCategory === category._id && (
                <ul className="ml-4 mt-2">
                  {subcategories
                    .filter((sub) => sub.category === category._id)
                    .map((subcategory) => (
                      <li
                        key={subcategory._id}
                        className={`cursor-pointer p-1 ${
                          selectedSubcategory === subcategory._id
                            ? "bg-gray-100"
                            : ""
                        }`}
                        onClick={() => handleSubcategoryClick(subcategory._id)}
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

      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">محصولات</h1>
        {loading ? (
          <p>در حال بارگذاری...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <Link href={`/product/${product._id}`} key={product._id}>
                <div className="border rounded-lg shadow-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? `http://localhost:8000/images/products/images/${product.images[0]}`
                        : "/placeholder.png"
                    }
                    alt={product.name || "محصول"}
                    className="w-full h-60 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <p className="text-teal-600 font-semibold">
                    {product.price.toLocaleString()} تومان
                  </p>
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4 flex items-center justify-center hover:bg-indigo-500"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleAddToCart(product);
                    }}
                  >
                    <BiBasket className="mr-2" />
                    افزودن به سبد خرید
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>هیچ محصولی برای نمایش وجود ندارد.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsWithSidebar;
