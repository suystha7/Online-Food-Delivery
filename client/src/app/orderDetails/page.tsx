"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const OrderDetails: React.FC = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/");
  };

  const orderData = {
    orderId: "123456",
    orderDate: "January 17, 2025",
    paymentMethod: "Stripe",
    totalAmount: "120.00",
    deliveryAddress: {
      fullName: "John Doe",
      address: "1234 Elm Street, Springfield, IL, 62701",
      phoneNumber: "123-456-7890",
    },
    orderItems: [
      {
        id: 1,
        name: "Wireless Headphones",
        quantity: 1,
        price: "50.00",
        imageUrl: "/images/headphones.jpg",
      },
      {
        id: 2,
        name: "Smart Watch",
        quantity: 1,
        price: "70.00",
        imageUrl: "/images/smartwatch.jpg",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24 bg-white shadow-lg rounded-md">
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Order Details
          </h1>
          <p className="text-gray-600 text-base">
            Thank you for your purchase! Here are the details of your order.
          </p>
        </div>
        <div className="flex bg-gray-50 p-4 rounded-md text-left mt-4 gap-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order Information
            </h2>
            <p className="text-gray-700 text-base">
              <strong>Order ID:</strong> {orderData.orderId}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Order Date:</strong> {orderData.orderDate}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Payment Method:</strong> {orderData.paymentMethod}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Total Amount:</strong> NRS.{orderData.totalAmount}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Delivery Address
            </h2>
            <p className="text-gray-700 text-base">
              <strong>Name:</strong> {orderData.deliveryAddress.fullName}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Address:</strong> {orderData.deliveryAddress.address}
            </p>
            <p className="text-gray-700 text-base">
              <strong>Phone:</strong> {orderData.deliveryAddress.phoneNumber}
            </p>
          </div>
        </div>
      </div>

      <div className=" bg-gray-50 p-4 rounded-md text-left mt-4 gap-10">
        <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
        <div className="flex space-y-4 gap-10">
          {orderData.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-50 p-4 rounded-md"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 rounded-md mr-4"
              />
              <div>
                <h3 className="text-gray-800 font-medium">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: NRS.{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ backgroundColor: "red" }}
          type="submit"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderDetails;
