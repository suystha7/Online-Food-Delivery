"use client";

import React from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const ShippingDetails: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const [paymentMethod, setPaymentMethod] = React.useState<string>("");

  const handlePaymentChange = (method: string) => {
    if (isValid) setPaymentMethod(method);
  };

  const onSubmit = () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === "COD") {
      router.push("/orderReview");
    } else if (paymentMethod === "Stripe") {
      router.push("/stripePayment");
    }
  };

  return (
    <div className="flex max-w-3xl mx-auto mt-16">
      <div className="w-full p-6 my-24 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                {...register("fullName", { required: "Full name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                {...register("address", { required: "Address is required" })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="City"
                variant="outlined"
                {...register("city", { required: "City is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Postal Code"
                variant="outlined"
                {...register("postalCode", {
                  required: "Full name is required",
                })}
                error={!!errors.postalCode}
                helperText={errors.postalCode?.message}
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="p-5 my-24 bg-white w-[90%]">
        <h3 className="text-3xl font-bold text-gray-800 mb-11 mt-1">
          Payment Method
        </h3>
        <p className="text-gray-600 text-base mb-6">
          Choose your preferred payment method from the options below.
        </p>
        <div className="flex flex-col gap-4 justify-center">
          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              paymentMethod === "COD"
                ? "bg-gray-100 border-red-500"
                : "border-gray-600"
            } ${!isValid ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => handlePaymentChange("COD")}
          >
            <h1 className="font-semibold text-black text-xl">
              Cash on Delivery (COD)
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Pay with cash upon delivery.
            </p>
          </div>

          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              paymentMethod === "Stripe"
                ? "bg-gray-100 border-red-500"
                : "border-gray-600"
            } ${!isValid ? "opacity-50 pointer-events-none" : ""}`}
            onClick={() => handlePaymentChange("Stripe")}
          >
            <h1 className="font-semibold text-black text-xl">Stripe Payment</h1>
            <p className="text-gray-600 mt-2 text-lg">
              Pay with your credit/debit card.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <div className="mt-6">
            <Button
              size="large"
              variant="contained"
              sx={{ backgroundColor: "red" }}
              type="submit"
              className={`w-full ${
                !isValid || !paymentMethod ? "text-white" : ""
              }`}
              disabled={!isValid || !paymentMethod}
              onClick={handleSubmit(onSubmit)}
            >
              {paymentMethod === "COD"
                ? "Proceed to Order Review"
                : paymentMethod === "Stripe"
                ? "Proceed to Stripe Payment"
                : "Proceed to Payment"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
