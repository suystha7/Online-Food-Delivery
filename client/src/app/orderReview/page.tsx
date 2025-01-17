"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, IconButton } from "@mui/material";
import { ArrowLeft } from "lucide-react";

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

  const orderData: OrderDetails = {
    fullName: "John Doe",
    address: "123 Main St",
    city: "Kathmandu",
    postalCode: "44600",
    phoneNumber: "+977-9800000000",
    items: [
      {
        foodId: "food1",
        name: "Burger",
        quantity: 2,
        price: 500,
      },
      {
        foodId: "food2",
        name: "Pizza",
        quantity: 1,
        price: 1000,
      },
      {
        foodId: "food1",
        name: "Burger",
        quantity: 2,
        price: 500,
      },
      {
        foodId: "food2",
        name: "Pizza",
        quantity: 1,
        price: 1000,
      },
    ],
    orderPrice: 2000,
    paymentMethod: "COD",
  };

  const handleEditOrder = () => {
    router.push("/shippingDetails");
  };

  const handleConfirmOrder = () => {
    // console.log("Order confirmed!");
    router.push("/orderSuccess");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-32 bg-white shadow-lg rounded-md">
      <div className="flex items-center gap-2">
        <IconButton
          onClick={() => router.back()}
          className="mb-4"
          aria-label="Go Back"
        >
          <ArrowLeft className="text-gray-800" />
        </IconButton>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Review</h2>
      </div>

      <div className="space-y-6">
        <div className="flex gap-24">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 underline">
              Shipping Details
            </h3>
            <div className="space-y-2 mb-7">
              <p>
                <strong>Name:</strong> {orderData.fullName}
              </p>
              <p>
                <strong>Address:</strong> {orderData.address}
              </p>
              <p>
                <strong>City:</strong> {orderData.city}
              </p>
              <p>
                <strong>Postal Code:</strong> {orderData.postalCode}
              </p>
              <p>
                <strong>Phone Number:</strong> {orderData.phoneNumber}
              </p>
            </div>
            <p>
              <strong>Payment Method:</strong>{" "}
              {orderData.paymentMethod === "COD"
                ? "Cash on Delivery"
                : "Stripe Payment"}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 underline">
              Order Items
            </h3>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div
                  key={item.foodId}
                  className="flex justify-between border-b pb-2 gap-20"
                >
                  <div className="flex gap-1 items-center">
                    <p className="text-xl font-semibold">{item.name}</p>
                    <p className="text-gray-600 text-base">x{item.quantity}</p>
                  </div>
                  <p className="text-xl font-semibold">
                    NRS {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Price
              </h3>
              <p className="text-xl font-semibold text-red-600">
                NRS {orderData.orderPrice}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button
            variant="outlined"
            className="w-full py-3 bg-gray-100 text-gray-800 hover:bg-gray-200 border-red-500"
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
