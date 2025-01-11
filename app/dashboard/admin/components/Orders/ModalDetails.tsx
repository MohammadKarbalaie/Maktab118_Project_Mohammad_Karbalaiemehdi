import React, { useState, useEffect } from "react";
import moment from "jalali-moment";
import axios from "axios";
import {IOrder} from "@/types/order";
import { ProductInOrder } from "@/types/product";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrderId: string | null;
  toggleDeliveryStatus: (orderId: string, currentStatus: boolean) => void;
  orders: { _id: string; deliveryStatus: boolean }[];
  getUserNameById: (userId: string) => string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedOrderId,
  toggleDeliveryStatus,
  orders,
}) => {
  const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (selectedOrderId) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/orders/${selectedOrderId}`
          );
          setOrderDetails(response.data.data.order);
        } catch (error) {
          console.error("Error fetching order details:", error);
        }
      }
    };

    fetchOrderDetails();
  }, [selectedOrderId]);

  if (!isOpen || !orderDetails) return null;

  const currentOrder = orders.find((order) => order._id === selectedOrderId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close Modal"
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4">جزئیات سفارش</h2>
        <p className="mb-2">شماره سفارش: {orderDetails._id}</p>
        <p className="mb-2">
          مشتری: {orderDetails.user.firstname} {orderDetails.user.lastname}
        </p>
        <p className="mb-2">
          تاریخ:{" "}
          {moment(orderDetails.deliveryDate).locale("fa").format("YYYY/MM/DD")}
        </p>
        <p className="mb-4">
          جمع مبلغ: ${orderDetails.totalPrice.toLocaleString()}
        </p>

        <h3 className="text-md font-semibold mb-2">محصولات:</h3>
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">محصول</th>
              <th className="border border-gray-300 px-4 py-2">تعداد</th>
              <th className="border border-gray-300 px-4 py-2">قیمت</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.products.map((product: ProductInOrder, index: number) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {product.product ? product.product.name : "نامشخص"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.count}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.price} تومان
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentOrder && (
          <div className="flex justify-center mt-4">
            <button
              className={`px-4 py-2 rounded text-white ${
                currentOrder.deliveryStatus ? "bg-red-500" : "bg-green-500"
              } hover:opacity-80`}
              onClick={() =>
                toggleDeliveryStatus(
                  currentOrder._id,
                  currentOrder.deliveryStatus
                )
              }
            >
              {currentOrder.deliveryStatus ? "لغو ارسال" : "تایید ارسال"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
