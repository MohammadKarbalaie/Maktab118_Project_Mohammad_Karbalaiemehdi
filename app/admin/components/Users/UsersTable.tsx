"use client";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const userData = [
  {
    id: 1,
    name: "جان دو",
    email: "john@example.com",
    role: "مشتری",
    status: "فعال",
  },
  {
    id: 2,
    name: "جین اسمیت",
    email: "jane@example.com",
    role: "مدیر",
    status: "فعال",
  },
  {
    id: 3,
    name: "باب جانسون",
    email: "bob@example.com",
    role: "مشتری",
    status: "غیرفعال",
  },
  {
    id: 4,
    name: "آلیس براون",
    email: "alice@example.com",
    role: "مشتری",
    status: "فعال",
  },
  {
    id: 5,
    name: "چارلی ویلسون",
    email: "charlie@example.com",
    role: "مشتری",
    status: "فعال",
  },
];

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(userData);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = userData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-950">کاربران</h2>

        <div className="relative">
          <div className="flex gap-6 items-center ">
            <button
              className="px-6 py-2 bg-gray-950
       text-white rounded-xl hover:bg-indigo-800
        hover:text-gray-100 transition duration-200"
            >
              معرفی کاربر جدید
            </button>

            <input
              type="text"
              placeholder="جستجوی کاربر ..."
              className="bg-gray-300 text-gray-950 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-4 text-gray-950" size={18} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                نام
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                ایمیل
              </th>
              <th className="px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                دسترسی
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-950 uppercase tracking-wider">
                اقدامات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium mr-4 text-gray-950">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-950">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="bg-indigo-500 text-white hover:text-indigo-100 px-6 py-2 rounded-xl ml-1">
                    ویرایش
                  </button>
                  <button className="bg-red-500 text-white hover:text-red-100 px-6 py-2 rounded-xl">
                    حذف
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
export default UsersTable;
