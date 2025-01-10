import React, { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from 'lucide-react';
import {
  AiOutlineHourglass,
  AiOutlineSend,
} from "react-icons/ai";
import Modal from "./ModalDetails";
import moment from "jalali-moment";
import { getorders } from "../../../../../services/order-service";
import { getUsers } from "../../../../../services/user-service";
import { IIUser } from "../../../../../types/user";
import { Order } from "../../../../../types/order";
import apiClient from "../../../../../services/api";

const OrdersTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<IIUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getorders(currentPage, 6);
        setOrders(response.data.orders);
        setTotalPages(response.total_pages);
        setFilteredOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orders.filter(
      (order) =>
        order._id.toLowerCase().includes(term) ||
        order.user.toLowerCase().includes(term)
    );
    setFilteredOrders(filtered);
  };

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setIsModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleDeliveryStatus = async (
    orderId: string,
    currentStatus: boolean
  ) => {
    try {
      const newStatus = !currentStatus;
      console.log(`Updating order ${orderId} to status: ${newStatus}`);
      const response = await apiClient.patch(`/orders/${orderId}`, {
        deliveryStatus: newStatus,
      });

      console.log('Server response:', response.data);

      if (response.data.status === 'success' && response.data.data.order) {
        const updatedOrder = response.data.data.order;
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, ...updatedOrder } : order
          )
        );
        setFilteredOrders((prevFiltered) =>
          prevFiltered.map((order) =>
            order._id === orderId ? { ...order, ...updatedOrder } : order
          )
        );
        console.log(`Successfully updated order ${orderId} status to ${newStatus}`);
      } else {
        throw new Error(response.data.error || 'Unexpected server response format');
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
      let errorMessage = "خطا در به‌روزرسانی وضعیت سفارش. لطفاً دوباره تلاش کنید.";
      if (error instanceof Error) {
        errorMessage += ` علت: ${error.message}`;
        if ('response' in error && error.response) {
          // @ts-ignore
          const responseData = error.response.data;
          if (responseData && responseData.details) {
            errorMessage += `\nجزئیات خطا: ${responseData.details}`;
          }
        }
      }
      alert(errorMessage);
    }
  };

  const getUserNameById = (userId: string) => {
    const user = users.find((user) => user._id === userId);
    return user ? `${user.firstname} ${user.lastname}` : "نامشخص";
  };

  return (
    <motion.div
      className="bg-gray-200 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 sm:p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-950">
          لیست سفارشات
        </h2>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="جستجوی سفارشات ..."
            className="w-full sm:w-auto bg-gray-300 text-gray placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-950"
            size={18}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-sm sm:text-base">
          <thead>
            <tr>
              <th className="px-2 sm:px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                شماره سفارش
              </th>
              <th className="px-2 sm:px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                مشتری
              </th>
              <th className="px-2 sm:px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                جمع مبلغ
              </th>
              <th className="px-2 sm:px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                وضعیت
              </th>
              <th className="px-2 sm:px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                تاریخ
              </th>
              <th className="px-2 sm:px-6 py-3 text-start text-xs font-medium text-gray-950 uppercase tracking-wider">
                اقدام
              </th>
            </tr>
          </thead>

          <tbody className="divide divide-gray-700">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <motion.tr
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-950">
                    {order._id}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-950">
                    {getUserNameById(order.user)}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-950">
                    ${order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.deliveryStatus
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.deliveryStatus ? "ارسال شده" : "در حال پردازش"}
                    </span>
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-950">
                    {moment(order.deliveryDate)
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-950 flex gap-2">
                    {/* <button
                      className="text-green-600 hover:text-indigo-300"
                      onClick={() =>
                        toggleDeliveryStatus(order._id, order.deliveryStatus)
                      }
                    >
                      <AiOutlineSend size={18} />
                    </button> */}
                    <button
                      className="text-yellow-700 hover:text-indigo-300"
                      onClick={() => handleOpenModal(order._id)}
                    >
                      <AiOutlineHourglass size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  هیچ سفارشی وجود ندارد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          قبلی
        </button>
        <span className="text-center sm:text-left">
          صفحه {currentPage} از {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          بعدی
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedOrderId={selectedOrderId}
        toggleDeliveryStatus={toggleDeliveryStatus}
        orders={orders} getUserNameById={function (userId: string): string {
          throw new Error("Function not implemented.");
        } }      />
    </motion.div>
  );
};

export default OrdersTable;

