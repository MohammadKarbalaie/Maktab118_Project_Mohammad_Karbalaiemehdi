"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import ProductsTableToogle from "@/app/admin/components/Product/Producttabletoggle";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-4 bg-gray-50">
      <div className="hidden xl:w-1/6 lg:block lg:w-3/12 bg-white shadow-lg">
        <Sidebar />
      </div>

      <div className="lg:hidden flex justify-between items-center p-4 bg-white shadow-md">
        <button
          className="text-2xl px-4 py-2 text-gray-700 rounded-md"
          onClick={toggleSidebar}
        >
          &#9776;
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <button
          className="text-gray-700 text-xl px-4 py-2 absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          ✕
        </button>
        <Sidebar />
      </div>

      <div className="flex-1 p-4 lg:ml-0">
        <ProductsTableToogle />
      </div>
    </div>
  );
}

export default Page;
