'use client'

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

type OrderItem = {
  foodId: string;
  name: string;
  quantity: number;
  price: number; // Price per item
};

type OrderDetails = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  items: OrderItem[];
  orderPrice: number;
  paymentMethod: string;
};

const OrderReview: React.FC = () => {
  const router = useRouter();

  // Sample order data (this would typically come from the backend)
  const orderData: OrderDetails = {
    fullName: "John Doe",
    address: "123 Main St",
    city: "Kathmandu",
    postalCode: "44600",
    phoneNumber: "+977 9800000000",
    items: [
      {
        foodId: "food1",
        name: "Burger",
        quantity: 2,
        price: 500, // Price for each item
      },
      {
        foodId: "food2",
        name: "Pizza",
        quantity: 1,
        price: 1000,
      },
    ],
    orderPrice: 2000, // Total order price
    paymentMethod: "COD", // Cash on Delivery (Example)
  };

  const handleEditOrder = () => {
    router.push("/shipping"); // Redirect to shipping details page to edit order
  };

  const handleConfirmOrder = () => {
    // Process the order confirmation (e.g., call API to place the order)
    console.log("Order confirmed!");
    router.push("/order-success"); // Redirect to success page
  };

  return (
    <div className="max-w-3xl mx-auto p-6 my-24 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Review</h2>

      <div className="space-y-6">
        {/* Shipping Details Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Shipping Details</h3>
          <div className="space-y-2">
            <p><strong>Name:</strong> {orderData.fullName}</p>
            <p><strong>Address:</strong> {orderData.address}</p>
            <p><strong>City:</strong> {orderData.city}</p>
            <p><strong>Postal Code:</strong> {orderData.postalCode}</p>
            <p><strong>Phone Number:</strong> {orderData.phoneNumber}</p>
          </div>
        </div>

        {/* Order Items Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Items</h3>
          <div className="space-y-4">
            {orderData.items.map((item) => (
              <div key={item.foodId} className="flex justify-between border-b pb-2">
                <div>
                  <p className="text-xl font-semibold">{item.name}</p>
                  <p className="text-gray-600">x{item.quantity}</p>
                </div>
                <p className="text-xl font-semibold">{item.price * item.quantity} NRS</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment Method</h3>
          <p>{orderData.paymentMethod === "COD" ? "Cash on Delivery" : "Stripe"}</p>
        </div>

        {/* Total Price Section */}
        <div className="flex justify-between mt-4">
          <h3 className="text-2xl font-semibold text-gray-800">Total Price</h3>
          <p className="text-xl font-semibold text-red-600">{orderData.orderPrice} NRS</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            variant="outlined"
            className="w-full py-3 bg-gray-100 text-gray-800 hover:bg-gray-200"
            onClick={handleEditOrder}
          >
            Edit Order
          </Button>
          <Button
            variant="contained"
            className="w-full py-3 bg-red-600 text-white hover:bg-red-700"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
