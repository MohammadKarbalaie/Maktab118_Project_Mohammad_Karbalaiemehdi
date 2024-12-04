"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getUsers } from "@/app/adminserver/services/user-services";
import {User} from '../../../adminserver/type/User';


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
                  آدرس
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
                key={user._id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                        {user.firstname.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="flex gap-3 text-sm font-medium mr-4 text-gray-950">
                        <p>{user.lastname} </p>
                        <p>{user.firstname}</p> 
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-950">{user.address}</div>
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