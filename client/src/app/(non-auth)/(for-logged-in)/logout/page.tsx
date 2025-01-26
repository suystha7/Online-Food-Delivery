"use client";

import useLogout from "@/api/auth/useLogout";
import { LogoutModal } from "@/components/modals";
import { ROUTE_PATHS } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const { mutateAsync, isPending, error, isSuccess } = useLogout();

  const router = useRouter();

  const logoutSubmitHandler = async () => {
    await mutateAsync();
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(ROUTE_PATHS.home);
    }
  }, [isSuccess]);

  const cancelHanlder = () => {
    router.back();
  };

  return (
    <div>
      <LogoutModal
        logoutSubmitHandler={logoutSubmitHandler}
        isLoading={isPending}
        error={error?.errorResponse?.message || error?.errorMessage}
        cancelHandler={cancelHanlder}
      />
    </div>
  );
}
