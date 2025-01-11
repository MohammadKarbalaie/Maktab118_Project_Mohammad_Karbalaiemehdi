"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiBasket, BiMenu, BiSearch } from "react-icons/bi";
import apiClient from "../../services/api";
import { urls } from "../../services/urls";
import { Category } from "../../types/category";
import Image from "next/image";
import Cart from "../../app/components/Cart";
import UserMenu from "../UserMenu";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiClient.get(urls.categories);
        setCategories(res.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleCartVisibility = () => setIsCartVisible(!isCartVisible);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const cartItemCount = Array.isArray(cartItems) 
  ? cartItems.reduce((total, item) => total + item.cartQuantity, 0) 
  : 0;
  
  return (
    <header className="bg-gray-100 shadow-sm relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-expanded={isMenuOpen}
          aria-label="Open Menu"
        >
          <BiMenu className="text-3xl" />
        </button>

       
        <Link href="/" className="flex-shrink-0 mx-auto lg:mx-0">
          <Image
            src="/Logo1.png"
            alt="Logo"
            width={100}
            height={80}
            className="h-20 cursor-pointer"
          />
        </Link>
        <div className="hidden lg:flex items-center bg-gray-200 rounded-md w-full max-w-lg mx-4">
          <select
            className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
            name="categories"
            id="categories"
            defaultValue=""
          >
            <option value="" disabled>
              دسته بندی ها
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.slugname}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            className="border-l border-gray-300 bg-transparent flex-grow font-semibold text-sm px-4 py-2"
            type="text"
            placeholder="من به دنبال ..."
          />
          <button className="p-4">
            <BiSearch className="text-gray-500 text-xl" />
          </button>
        </div>

        {/* Desktop  */}
        <nav className="hidden lg:flex items-center gap-6 ml-auto">
          <ul className="flex gap-6 items-center justify-center">
            <li>
              <Link
                href="/"
                className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700"
              >
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700"
              >
                فروشگاه
              </Link>
            </li>
            <li className="">
              <button
                onClick={toggleCategory}
                className="hover:bg-gray-300  py-2 rounded-3xl transition duration-200 hover:text-gray-700"
              >
                دسته بندی ها
              </button>

              {isCategoryOpen && (
                <div className="absolute bg-white px-2 border z-10 left-[620px] mt-2">
                  {categories.map((category) => (
                    <li key={category._id} className="border-b py-2">
                      <a
                        href={`/category/${category.slugname}`}
                        className="block text-gray-700 py-2 hover:bg-gray-200 rounded-md px-4"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </div>
              )}
            </li>
          </ul>

          <UserMenu />

          <button onClick={toggleCartVisibility} className="relative">
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-full">
              {cartItemCount}
            </div>
            <BiBasket className="text-2xl text-gray-600 hover:text-black hover:scale-125 transition duration-200" />
          </button>
        </nav>
      </div>

      {/* Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md rounded-md mt-2 px-4 py-2 transition-all duration-300">
          <ul>
            <li className="border-b py-2">
              <Link
                href="/Shop"
                className="block text-gray-700 hover:bg-gray-200 rounded-md px-4"
              >
                صفحه اصلی
              </Link>
            </li>
            <li className="border-b py-2">
              <Link
                href="/Shop/product"
                className="block text-gray-700 hover:bg-gray-200 rounded-md px-4"
              >
                فروشگاه
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category._id} className="border-b py-2">
                <Link
                  href={`/Shop/category/${category.slugname}`}
                  className="block text-gray-700 hover:bg-gray-200 rounded-md px-4"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isCartVisible && (
        <div className="absolute top-0 right-0 w-full sm:w-1/3 bg-white shadow-lg rounded-lg z-10">
          <Cart onClose={() => setIsCartVisible(false)} />
        </div>
      )}
    </header>
  );
}

export default Header;

