"use client";
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
  const [orders] = useState<Order[]>(mockOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold pl-5">Orders Details</h1>
        <button className="btn-red text-white px-6 py-2 rounded">
          Add Order
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-4 py-2 text-center">S.N.</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Items</th>
            <th className="border px-4 py-2 text-center">Payment</th>
            <th className="border px-4 py-2 text-center">Price</th>
            <th className="border px-4 py-2 text-center">Payment Medium</th>
            <th className="border px-4 py-2 text-center">Status</th>
            <th className="border px-4 py-2 text-center">Created At</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {paginatedOrders.map((order, index) => (
            <tr key={order.id}>
              <td className="border px-4 py-2 text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td className="border px-4 py-2">{order.address}</td>
              <td className="border px-4 py-2">{order.customer}</td>
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
                {order.isPaymentDone ? (
                  <CheckCircle className="text-green-500 w-5 h-5 inline-block" />
                ) : (
                  <XCircle className="text-red-500 w-5 h-5 inline-block" />
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                Rs.{order.orderPrice.toLocaleString()}
              </td>
              <td className="border px-4 py-2 text-center">
                {order.paymentMedium}
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
      <div className="flex justify-center items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-50 rounded-full mr-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-50 rounded-full ml-2"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
