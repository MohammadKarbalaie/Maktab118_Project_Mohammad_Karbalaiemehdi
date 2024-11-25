"use client";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardLayout from "../components/DashboardLayout";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 bg-gray-50">
      <div className="hidden lg:block lg:w-1/4">
        <Sidebar />
      </div>
      <div className="lg:hidden flex justify-between p-4">
        <button className="text-2xl p-2 rounded-md" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:hidden fixed top-0 left-0 h-full bg-gray-300/100 z-50 w-64`}
      >
        <Sidebar />
      </div>

      <div className="lg:w-4/4 w-full">
        <DashboardLayout />
      </div>
    </div>
  );
}

export default Page;
