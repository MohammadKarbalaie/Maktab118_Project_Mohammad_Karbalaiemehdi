import React from "react";
import { AiOutlineMenu, AiOutlineProduct, AiOutlineTags, AiOutlineUnorderedList, AiOutlineUsergroupAdd } from "react-icons/ai";

function Sidebar() {
  return (
    <div className="h-[98vh] mx-2 my-2 w-72 lg:w-64 flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl ">
      <div className="p-6 my-2 border-b w-full text-center shadow-gray-700 shadow-lg">
        <p className="text-xl flex items-center justify-center gap-2">
          <AiOutlineMenu />
          داشبورد{" "}
        </p>
      </div>
      <div className="p-6 my-2 w-full text-center">
        <ul className="flex flex-col items-center">
          <li
            className="px-6 w-60 py-3 cursor-pointer
           hover:bg-gray-50/10 transition duration-300
            rounded-md flex gap-4 items-center justify-start"
          >
            <AiOutlineProduct className="text-2xl" />
            محصولات
          </li>
          <li
            className="px-6 w-60 py-3 cursor-pointer hover:bg-gray-50/10
           transition duration-300 rounded-md flex gap-4 items-center justify-start"
          >
            <AiOutlineTags className="text-2xl" />
            دسته بندی ها
          </li>
          <li
            className="px-6 w-60 py-3 cursor-pointer hover:bg-gray-50/10
           transition duration-300 rounded-md flex gap-4 items-center justify-start"
          >
            <AiOutlineUnorderedList className="text-2xl" />
            سفارشات
          </li>
          <li
            className="px-6 w-60 py-3 cursor-pointer hover:bg-gray-50/10
           transition duration-300 rounded-md flex gap-4 items-center justify-start"
          >
            <AiOutlineUsergroupAdd className="text-2xl" />
            کاربران
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
