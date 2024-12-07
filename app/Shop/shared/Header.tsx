/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { BiBasket, BiMenu, BiSearch, BiUser } from "react-icons/bi";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between lg:justify-start">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 order-1"
        >
          <BiMenu className="text-3xl" />
        </button>

        <div className="flex-shrink-0 order-2 lg:order-1 mx-auto lg:mx-0">
          <img
            className="h-20 cursor-pointer"
            src="./Logo1.png"
            width="100"
            alt="Logo"
          />
        </div>

        <div className="hidden lg:flex items-center bg-gray-100 rounded-md w-full max-w-lg order-2 lg:order-2 mx-4">
          <select
            className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
            name="categories"
            id="categories"
          >
            <option>دسته بندی ها</option>
            <option>دوچرخه</option>
            <option>موتور</option>
            <option>لوازم جانبی</option>
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

        <nav className="gap-8 items-center xl:mr-40 lg:mr-20 lg:flex ml-auto order-3 justify-center">
          <a href="#" className="relative">
            <BiUser className="text-2xl md:text-3xl hidden lg:flex text-gray-600" />
          </a>

          <a href="#" className="relative">
            <div className="absolute -top-2 -right-2  bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-full">
              12
            </div>
            <BiBasket className="text-2xl md:text-3xl text-gray-600" />
          </a>
        </nav>
      </div>

      <div
        className={`lg:hidden bg-white shadow-md rounded-md mt-2 px-4 py-2 transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          صفحه اصلی
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          دسته بندی ها
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          محصولات
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          درباره ما
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          تماس با ما
        </a>
        <a
          href="#"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md"
        >
          ثبت نام / ورود
        </a>
      </div>

      {/* Desktop Menu */}
      <hr />
      <nav className="hidden xl:flex lg:flex bg-gray-50 py-3">
        <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
          <ul className="flex gap-4">
            <li className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700 cursor-pointer">
              صفحه اصلی
            </li>
            <li className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700 cursor-pointer">
              دسته بندی ها
            </li>
            <li className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700 cursor-pointer">
              محصولات
            </li>
            <li className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700 cursor-pointer">
              درباره ما
            </li>
            <li className="hover:bg-gray-300 px-4 py-2 rounded-3xl transition duration-200 hover:text-gray-700 cursor-pointer">
              تماس با ما
            </li>
          </ul>
        </div>
      </nav>
      <hr />
    </header>
  );
}

export default Header;
