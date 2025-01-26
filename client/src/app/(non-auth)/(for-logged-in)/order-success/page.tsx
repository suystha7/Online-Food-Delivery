"use client";

import useClearCart from "@/api/cart/useClearCart";
import { ROUTE_PATHS } from "@/constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button } from "@mui/material";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const data = sessionStorage.getItem("orderData");

  const [loading, setLoading] = useState(true);

  const { mutateAsync } = useClearCart();

  useEffect(() => {
    if (!data) {
      router.push(ROUTE_PATHS.home);
    } else {
      setLoading(false);
      sessionStorage.removeItem("orderData");
      (async () => {
        await mutateAsync();
      })();
    }
  }, []);

  const handleContinueShopping = () => {
    router.push(ROUTE_PATHS.home);
  };

  const handleViewOrderDetails = () => {
    router.push(ROUTE_PATHS.myOrders);
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  if (searchParams.get("success") === "false") {
    return (
      <span>
        An error has occurred during payment using stripe. Please visit homepage
      </span>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 mt-32 rounded-md">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg w-full">
        <CheckCircleIcon
          style={{ fontSize: "5rem", color: "green" }}
          className="mx-auto mb-6"
          size={"4rem"}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-gray-600 mb-6 text-base">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-md mt-3 text-left">
            <p className="text-gray-700">
              <strong>Order ID:</strong> {orderId}
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
}

{
  /* <div className="max-w-3xl mx-auto p-6 my-24 bg-white shadow-lg rounded-md">
<div className="flex flex-col items-center gap-2">
  <CheckCircleOutlineIcon className="w-[96px] h-[96px] text-green-600" />

  <h3 className="text-2xl font-bold text-gray-800 ">
    Your order has been placed.
  </h3>

  <span>{orderId}</span>

  <Link href={ROUTE_PATHS.home} className="underline ml-2">
    Return to Homepage
  </Link>
</div>
</div> */
}
