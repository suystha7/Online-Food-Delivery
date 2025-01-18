"use client";

import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import Spinner from "@/components/icons/Spinner";
import { ROUTE_PATHS } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { data, isPending, isError, isSuccess } = useGetCurrentUser();

  useEffect(() => {
    if (!data && isError) {
      router.push(ROUTE_PATHS.signin);
    }
  }, [isError]);

  if (isPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isSuccess) {
    return <div>{children}</div>;
  }
}
