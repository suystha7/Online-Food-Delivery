"use client";

import useClearCart from "@/api/cart/useClearCart";
import { ROUTE_PATHS } from "@/constants";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
    <div className="max-w-3xl mx-auto p-6 my-24 bg-white shadow-lg rounded-md">
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
    </div>
  );
}
