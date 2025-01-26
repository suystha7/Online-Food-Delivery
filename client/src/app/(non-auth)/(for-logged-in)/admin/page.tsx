"use client";

import Spinner from "@/components/icons/Spinner";
import { ROUTE_PATHS } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTE_PATHS.category)
  },[]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
