"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import useGetCart from "@/api/cart/useGetCart";
import { getAmountWithNepaliCurrency } from "@/utils/helpers";
import { DELIVERY_CHARGES, ROUTE_PATHS } from "@/constants";
import Link from "next/link";
import usePlaceOrder from "@/api/order/usePlaceOrder";
import { ErrorMessage } from "@/components/basic";

type OrderItem = {
  foodId: string;
  name: string;
  quantity: number;
  price: number; // Price per item
};

interface IOrderData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  paymentMethod: "CASH" | "ONLINE";
}

const OrderReview = () => {
  const [orderData, setOrderData] = useState<IOrderData>();

  const router = useRouter();

  const data = sessionStorage.getItem("orderData");

  const {
    data: cartData,
    isPending: isCartDataPending,
    isError: isCartDataError,
    error: cartDataError,
  } = useGetCart();

  const {
    mutateAsync,
    data: response,
    isPending,
    isError,
    isSuccess,
    error,
  } = usePlaceOrder();

  useEffect(() => {
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, [data]);

  const placeOrder = async () => {
    if (orderData && cartData) {
      const filteredOrderData = Object.fromEntries(
        Object.entries(orderData).filter(([_, value]) => value !== "")
      );

      const filteredCartData = cartData.items.map((item) => ({
        foodId: item.food._id,
        name: item.food.name,
        price: item.food.price,
        mainImage: item.food.mainImage,
        quantity: item.quantity,
      }));

      await mutateAsync({
        ...filteredOrderData,
        items: filteredCartData,
        orderPrice: cartData.cartTotal,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(response.url);
    }
  }, [isSuccess]);

  if (isCartDataPending) {
    return <span>Loading...</span>;
  }

  if (isCartDataError) {
    return (
      <span>
        {cartDataError.errorResponse?.message || cartDataError.errorMessage}
      </span>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 my-24 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Review</h2>
      {error && (
        <ErrorMessage
          message={error?.errorResponse?.message || error?.errorMessage}
        />
      )}

      {orderData ? (
        <div className="space-y-6">
          {/* Shipping Details Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Shipping Details
            </h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {orderData?.fullName}
              </p>
              <p>
                <strong>Phone Number:</strong> {orderData?.phoneNumber}
              </p>
              <p>
                <strong>Address:</strong> {orderData?.address}
              </p>
              <p>
                <strong>City:</strong> {orderData?.city || "Not defined"}
              </p>
              <p>
                <strong>Postal Code:</strong>{" "}
                {orderData?.postalCode || "Not defined"}
              </p>
            </div>
          </div>

          {/* Order Items Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Order Items
            </h3>
            <div className="space-y-4">
              {cartData?.items.map((item) => (
                <div
                  key={item.food._id}
                  className="flex justify-between border-b pb-2"
                >
                  <div>
                    <p className="text-xl font-semibold">{item.food.name}</p>
                    <p className="text-gray-600">x{item.quantity}</p>
                  </div>
                  <p className="text-xl font-semibold">
                    {getAmountWithNepaliCurrency({
                      amount: item.quantity * item.food.price,
                    })}
                  </p>
                </div>
              ))}
              <div className="flex justify-between border-b pb-2">
                <div>
                  <p className="text-xl font-semibold">Delivery Charges</p>
                </div>
                <p className="text-xl font-semibold">
                  {getAmountWithNepaliCurrency({
                    amount: DELIVERY_CHARGES,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment Method
            </h3>
            <p>
              {orderData?.paymentMethod === "CASH"
                ? "Cash on Delivery"
                : "Stripe"}
            </p>
          </div>

          {/* Total Price Section */}
          <div className="flex justify-between mt-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              Total Price
            </h3>
            <p className="text-xl font-semibold text-red-600">
              {getAmountWithNepaliCurrency({
                amount: cartData?.cartTotal + DELIVERY_CHARGES,
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <Button
              variant="outlined"
              className="w-full py-3 bg-gray-100 text-gray-800 hover:bg-gray-200"
              onClick={() => router.push(ROUTE_PATHS.shipping)}
            >
              Edit Order
            </Button>
            <Button
              variant="contained"
              className="w-full py-3 bg-red-600 text-white hover:bg-red-700"
              onClick={placeOrder}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <span>Please fill in shipping details first.</span>
          <Link href={ROUTE_PATHS.home} className="underline ml-2">
            Go to Homepage
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderReview;
