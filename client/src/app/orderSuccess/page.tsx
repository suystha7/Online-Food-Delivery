"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess: React.FC = () => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleViewOrderDetails = () => {
    router.push("/orderDetails");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-32 rounded-md">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg w-full">
        <CheckCircleIcon
          style={{ fontSize: "5rem", color: "green" }}
          className="mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6 text-base">
          Thank you for your purchase. Your order has been placed successfully.
          We’ve sent a confirmation email with your order details.
        </p>
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-md mt-3 text-left">
            <p className="text-gray-700">
              <strong>Order ID:</strong> 123456
            </p>
            <p className="text-gray-700">
              <strong>Total Amount:</strong> NRS 120
            </p>
            <p className="text-gray-700">
              <strong>Payment Method:</strong> Stripe
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            size="large"
            variant="contained"
            sx={{ backgroundColor: "red" }}
            type="submit"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            size="large"
            type="submit"
            sx={{ color: "red", borderColor: "red" }}
            onClick={handleViewOrderDetails}
          >
            View Order Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
