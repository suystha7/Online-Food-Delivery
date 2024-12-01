"use client";

import React, { useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ShippingDetails: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("COD"); // Default to COD

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData, paymentMethod); // Log the form data and selected payment method

    if (paymentMethod === "COD") {
      // Redirect to order review page if COD is selected
      router.push("/orderReview");
    } else if (paymentMethod === "Stripe") {
      // Redirect to payment page if Stripe is selected
      router.push("/payment");
    }
  };

  return (
    <div className="flex max-w-3xl mx-auto">
      <div className=" w-full p-6 my-24 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping Details
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="p-5 my-24 bg-white w-[80%]">
        <h3 className="text-3xl font-bold text-gray-800 mb-14">Payment Method</h3>
        <div className="flex flex-col mt-4 gap-4 justify-center">
          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              paymentMethod === "COD"
                ? "bg-gray-100 border-red-500"
                : "border-gray-600"
            }`}
            onClick={() => handlePaymentChange("COD")}
          >
            <h1 className="font-semibold text-black text-xl">
              Cash on Delivery (COD)
            </h1>
            <p className="text-gray-600 mt-2">Pay with cash upon delivery.</p>
          </div>

          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              paymentMethod === "Stripe"
                ? "bg-gray-100 border-red-500"
                : "border-gray-600"
            }`}
            onClick={() => handlePaymentChange("Stripe")}
          >
            <h1 className="font-semibold text-black text-xl">Stripe</h1>
            <p className="text-gray-600 mt-2">
              Pay with your credit or debit card.
            </p>
          </div>

          {/* <div
      className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
        paymentMethod === "Online" ? "bg-gray-100 border-gray-500" : "border-gray-300"
      }`}
      onClick={() => handlePaymentChange("Online")}
        >
      <p className="font-medium">Online Payment</p>
        </div> */}
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full btn-red"
          >
            {paymentMethod === "COD"
              ? "Proceed to Order Review"
              : "Proceed to Stripe Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
