"use client";

import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import Spinner from "@/components/icons/Spinner";
import { ROUTE_PATHS } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data, isSuccess, isPending } = useGetCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (data && isSuccess) {
      router.push(ROUTE_PATHS.home);
    }
  }, [isSuccess]);

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-8  rounded-lg">
          {children}
        </div>
      </div>
    );
  }
}
