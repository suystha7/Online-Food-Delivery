"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BUTTON_TYPES, ROUTE_PATHS, ShippingFormFields } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingValidationSchema } from "@/schema/shipping.schema";
import { Button, Input } from "@/components/basic";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import useGetCart from "@/api/cart/useGetCart";

const ShippingDetails: React.FC = () => {
  const [orderData, setOrderData] = useState<
    ShippingFormFields & { paymentMethod: "CASH" | "ONLINE" }
  >();

  const router = useRouter();

  const { data: userData, isSuccess } = useGetCurrentUser();

  const data = sessionStorage.getItem("orderData");

  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "ONLINE">("CASH");

  const {
    data: cartData,
    isPending: isCartDataPending,
    isSuccess: isCartDataSuccess,
  } = useGetCart();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShippingFormFields>({
    resolver: zodResolver(shippingValidationSchema),
    shouldFocusError: false,
  });

  useEffect(() => {
    if (isCartDataSuccess && cartData.items.length === 0) {
      router.push(ROUTE_PATHS.home);
    }
  }, [isCartDataSuccess]);

  useEffect(() => {
    if (data) {
      setOrderData(JSON.parse(data));
    }
  }, [data]);

  useEffect(() => {
    if (orderData) {
      setValue("fullName", orderData?.fullName);
      setValue("phoneNumber", orderData?.phoneNumber);
      setValue("address", orderData?.address);
      setValue("city", orderData?.city);
      setValue("postalCode", orderData?.postalCode);
      setPaymentMethod(orderData.paymentMethod);
    } else if (isSuccess) {
      setValue("fullName", userData.fullName);
      setValue("phoneNumber", userData.phoneNumber);
    }
  }, [isSuccess, orderData]);

  const onSubmit = (data: ShippingFormFields) => {
    sessionStorage.setItem(
      "orderData",
      JSON.stringify({ ...data, paymentMethod })
    );
    router.push(ROUTE_PATHS.orderReview);
  };

  if (isCartDataPending) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex max-w-3xl mx-auto">
      <div className="w-full p-6 my-24 bg-white">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Shipping Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="text"
            label="Full Name"
            errorMessage={errors.fullName?.message || ""}
            {...register("fullName")}
          />

          <Input
            type="number"
            label="Phone Number"
            errorMessage={errors.phoneNumber?.message || ""}
            {...register("phoneNumber")}
          />

          <Input
            type="text"
            label="Address"
            errorMessage={errors.address?.message || ""}
            {...register("address")}
          />

          <Input
            type="text"
            label="City"
            isRequired={false}
            errorMessage={errors.city?.message || ""}
            {...register("city")}
          />

          <Input
            type="number"
            label="Postal Code"
            isRequired={false}
            errorMessage={errors.postalCode?.message || ""}
            {...register("postalCode")}
          />
        </form>
      </div>

      <div className="p-5 my-24 bg-white w-[80%]">
        <h3 className="text-3xl font-bold text-gray-800 mb-14">
          Payment Method
        </h3>

        <div className="flex flex-col mt-4 gap-4 justify-center">
          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              paymentMethod === "CASH"
                ? "bg-gray-100 border-red-500"
                : "border-gray-600"
            }`}
            onClick={() => setPaymentMethod("CASH")}
          >
            <h1 className="font-semibold text-black text-xl">
              Cash on Delivery (COD)
            </h1>
            <p className="text-gray-600 mt-2">Pay with cash upon delivery.</p>
          </div>

          <div
            className={`cursor-pointer p-4 border rounded-md flex-1 text-center ${
              paymentMethod === "ONLINE"
                ? "bg-gray-100 border-red-500"
                : "border-gray-600"
            }`}
            onClick={() => setPaymentMethod("ONLINE")}
          >
            <h1 className="font-semibold text-black text-xl">Stripe</h1>
            <p className="text-gray-600 mt-2">
              Pay with your credit or debit card.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            onClickHandler={handleSubmit(onSubmit)}
            buttonType={BUTTON_TYPES.primaryButton}
            className={`w-full py-4`}
            // isDisabled={!isValid}
          >
            Proceed to Order Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
