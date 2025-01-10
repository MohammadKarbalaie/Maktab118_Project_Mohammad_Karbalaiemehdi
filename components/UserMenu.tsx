"use client";

import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/redux/store";
import { logoutUser } from "../app/redux/slices/cartSlice";
import Link from "next/link";
import Cookies from "js-cookie";

const UserMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const Auth = Cookies.get("user");
  const user = Auth ? JSON.parse(Auth) : undefined;

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");
    Cookies.remove("role");
    Cookies.remove("token");
    dispatch(logoutUser());
    router.push("/auth/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="text-2xl text-gray-600 hover:text-black hover:scale-125 transition duration-200"
      >
        <BiUser />
      </button>

      {isMenuOpen && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
          {user ? (
            <>
              <div className="px-4 py-2 border-b text-gray-700 font-semibold flex items-center gap-2 hover:bg-gray-100 transition duration-300">
                <BiUser className="text-xl" />
                <Link href={"/dashboard/user"}>
                  <span>{user.username}</span>
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-right px-4 py-2 transition duration-300 text-red-500 hover:bg-gray-100 rounded-md"
              >
                خروج
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 rounded-md"
            >
              ورود
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
