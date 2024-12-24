/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Category } from "../../../types/category";
import { ISubcategory } from "../../../types/subcategory";
import { Product } from "../../../types/product";
import Link from "next/link";
import { BiBasket } from "react-icons/bi";
import { useCart } from "../../../context/CartContext"; // وارد کردن Context

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<
    ISubcategory[]
  >([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const { addToCart } = useCart(); // دسترسی به `addToCart` از context
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
    if (selectedCategory || selectedSubcategory) {
      axios
        .get(`${apiUrl}/products`)
        .then((response) => {
          const filteredProducts = response.data.data.products.filter(
            (product: Product) => {
              const categoryMatch = selectedCategory
                ? product.category === selectedCategory
                : true;
              const subcategoryMatch = selectedSubcategory
                ? product.subcategory === selectedSubcategory
                : true;
              return categoryMatch && subcategoryMatch;
            }
          );

          setProducts(filteredProducts);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [selectedCategory, selectedSubcategory]);

  return (
    <div className="w-6/6 flex gap-8">
      <div className="w-1/6 border p-4 m-4">
        <h2>دسته‌بندی‌ها</h2>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-20 items-start justify-start"
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <h3>زیر دسته‌بندی‌ها</h3>
            <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
              <option value="">انتخاب زیر دسته‌بندی</option>
              {filteredSubcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <h1 className="text-3xl">محصولات</h1>
      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="product-card bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              <Link
                href={`/Shop/product/${product._id}`}
                className="block"
              >
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
                    onClick={() => addToCart(product)} // افزودن محصول به سبد خرید
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
  );
};

export default Sidebar;
