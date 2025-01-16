"use client";

import { Button } from "@mui/material";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  foodId: string;
  quantity: number;
}

interface Order {
  id: number;
  address: string;
  customer: string;
  items: OrderItem[];
  isPaymentDone: boolean;
  orderPrice: number;
  paymentMedium: string;
  status: string;
  createdAt: string;
}

const mockOrders: Order[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  address: `Address ${index + 1}`,
  customer: `Customer ${index + 1}`,
  items: [
    {
      foodId: `Food ${index + 1}`,
      quantity: Math.floor(Math.random() * 5) + 1,
    },
    {
      foodId: `Food ${index + 2}`,
      quantity: Math.floor(Math.random() * 3) + 1,
    },
  ],
  isPaymentDone: Math.random() > 0.5,
  orderPrice: Math.floor(Math.random() * 5000) + 500,
  paymentMedium: ["CASH", "CARD", "ONLINE"][
    Math.floor(Math.random() * 3)
  ] as string,
  status: ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"][
    Math.floor(Math.random() * 4)
  ] as string,
  createdAt: "2024-11-28",
}));

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
  const [statusToUpdate, setStatusToUpdate] = useState<string>("");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle order selection
  const handleSelectOrder = (orderId: number) => {
    const newSelection = new Set(selectedOrders);
    if (newSelection.has(orderId)) {
      newSelection.delete(orderId);
    } else {
      newSelection.add(orderId);
    }
    setSelectedOrders(newSelection);
  };

  // Handle status change for selected orders
  const handleStatusChange = (status: string) => {
    const updatedOrders = orders.map((order) => {
      if (selectedOrders.has(order.id)) {
        return { ...order, status };
      }
      return order;
    });
    setOrders(updatedOrders);
    setSelectedOrders(new Set()); // Clear selected orders after status update
  };

  // Handle deletion of selected orders
  const handleDeleteSelected = () => {
    const updatedOrders = orders.filter(
      (order) => !selectedOrders.has(order.id)
    );
    setOrders(updatedOrders);
    setSelectedOrders(new Set()); // Clear selected orders after deletion
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold pl-5">Orders Details</h1>
      </div>

      {selectedOrders.size > 0 && (
        <div className=" text-center flex items-center justify-end gap-4 mb-6">
          <select
            className="bg-white text-black px-4 py-2 rounded"
            value={statusToUpdate}
            onChange={(e) => setStatusToUpdate(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button
            className="btn-red"
            onClick={() => {
              if (statusToUpdate) {
                handleStatusChange(statusToUpdate);
              }
            }}
          >
            Update Status
          </button>
          <button className="btn-red" onClick={handleDeleteSelected}>
            {selectedOrders.size > 1 ? "Delete Multiple" : "Delete"}
          </button>
        </div>
      )}

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead className="bg-gray-50">
          <tr>
            {/* Select All Checkbox */}
            <th className="border px-4 py-2 text-center">
              <input
                type="checkbox"
                checked={paginatedOrders.every((order) =>
                  selectedOrders.has(order.id)
                )}
                onChange={() => {
                  const newSelection = new Set(selectedOrders);
                  if (paginatedOrders.every((order) => newSelection.has(order.id))) {
                    // Unselect all orders on the current page
                    paginatedOrders.forEach((order) => newSelection.delete(order.id));
                  } else {
                    // Select all orders on the current page
                    paginatedOrders.forEach((order) => newSelection.add(order.id));
                  }
                  setSelectedOrders(newSelection);
                }}
              />
            </th>
            <th className="border px-4 py-2 text-center">S.N.</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2 text-center">Price</th>
            <th className="border px-4 py-2 text-center">Payment Method</th>
            <th className="border px-4 py-2 text-center">Payment</th>
            <th className="border px-4 py-2 text-center">Status</th>
            <th className="border px-4 py-2 text-center">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {paginatedOrders.map((order, index) => (
            <tr key={order.id}>
              <td className="border px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedOrders.has(order.id)}
                  onChange={() => handleSelectOrder(order.id)}
                />
              </td>
              <td className="border px-4 py-2 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border px-4 py-2">{order.customer}</td>
              <td className="border px-4 py-2">{order.address}</td>
              <td className="border px-4 py-2">
                <ul className="text-sm list-disc pl-5">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.foodId} - {item.quantity} pcs
                    </li>
                  ))}
                </ul>
              </td>

              <td className="border px-4 py-2 text-center">
                Rs.{order.orderPrice.toLocaleString()}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.paymentMedium}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.isPaymentDone ? (
                  <CheckCircle className="text-green-500 w-5 h-5 inline-block" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5 inline-block" />
                )}
              </td>
              <td
                className={`border px-4 py-2 text-center ${
                  order.status === "PENDING"
                    ? "text-yellow-600"
                    : order.status === "PROCESSING"
                    ? "text-blue-600"
                    : order.status === "COMPLETED"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {order.status}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 mb-4">
        <Button
          className="px-4 py-2 bg-white mr-2 disabled:bg-gray-300"
          disabled={currentPage === 1 || orders.length === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </Button>
        <span className="px-4 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          className="px-4 py-2 bg-white ml-2 disabled:bg-gray-300"
          disabled={currentPage === totalPages || orders.length === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default OrdersTable;
  