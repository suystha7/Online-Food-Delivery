"use client";

import { ReactNode, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import "./styles.css";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import Spinner from "@/components/icons/Spinner";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants";

export default function Layout({ children }: { children: ReactNode }) {
  const { data, isPending, error, isSuccess } = useGetCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.replace(ROUTE_PATHS.home);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess && data.role === "USER") {
      router.replace(ROUTE_PATHS.home);
    }
  }, [isSuccess]);

  if (isPending) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (data && data.role === "ADMIN") {
    return (
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen overflow-auto flex-1 py-6 px-12">
          <main className="">{children}</main>
        </div>
      </div>
    );
  }
}
