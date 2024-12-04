"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getUsers } from "@/app/adminserver/services/user-services";
import { User } from "../../../adminserver/type/User";

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(term) ||
        user.address.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <motion.div
      className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 md:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-950 mb-4 sm:mb-0">
          کاربران
        </h2>
        <div className="relative w-full sm:w-auto flex items-center gap-4">
          <button
            className="px-4 py-2 md:px-6 md:py-2.5 bg-gray-950 text-white text-sm md:text-base rounded-xl hover:bg-indigo-800 hover:text-gray-100 transition duration-200"
          >
            معرفی کاربر جدید
          </button>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="جستجوی کاربر ..."
              className="w-full sm:w-64 bg-gray-300 text-gray-950 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 text-gray-950" size={18} />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 md:px-6 py-2 md:py-3 text-start text-xs md:text-sm font-medium text-gray-950 uppercase tracking-wider">
                نام
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-start text-xs md:text-sm font-medium text-gray-950 uppercase tracking-wider">
                آدرس
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-start text-xs md:text-sm font-medium text-gray-950 uppercase tracking-wider">
                دسترسی
              </th>
              <th className="px-4 md:px-6 py-2 md:py-3 text-right text-xs md:text-sm font-medium text-gray-950 uppercase tracking-wider">
                اقدامات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.firstname.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex gap-2 text-sm md:text-base font-medium text-gray-950">
                        <p>{user.lastname}</p>
                        <p>{user.firstname}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                  <div className="text-sm md:text-base text-gray-950">
                    {user.address}
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs md:text-sm leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 md:px-6 py-3 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button className="bg-indigo-500 text-white hover:text-indigo-100 px-4 py-2 text-xs md:text-sm rounded-xl">
                      ویرایش
                    </button>
                    <button className="bg-red-500 text-white hover:text-red-100 px-4 py-2 text-xs md:text-sm rounded-xl">
                      حذف
                    </button>
                  </div>
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
