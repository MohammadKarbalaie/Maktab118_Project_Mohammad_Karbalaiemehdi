"use client"
import React, { useState } from 'react'
import Sidebar  from '../../admin/components/Sidebar'
import CategoryPage from '../../admin/components/Category/CategoryTable';


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
        <button className="text-2xl px-2 rounded-md absolute left-0" onClick={toggleSidebar}>
          &#9776;
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:hidde fixed top-0 right-0 h-full z-50 w-64 `}
      >
        <Sidebar />
      </div>

      <div className="w-full 2xl:w-full 2xl:-mr-[125px] xl:-mr-[20px] lg:-mr-[30px] md:mr-0 sm:mr-0 xl:w-full lg:w-4/4 px-2 xl:px-0 lg:px-0 md:px-0">
        <CategoryPage />
      </div>
    </div>
  );
}

export default Page;
