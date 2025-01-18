"use client";

import { ChangePasswordModal } from "@/components/modals";
import { ChangePasswordFormFields } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useChangePassword from "@/api/auth/useChangePassword";
import useCustomToast from "@/hooks/useCustomToast";

export default function PasswordChange() {
  const { mutateAsync, isPending, error, isSuccess } = useChangePassword();

  const router = useRouter();

  const toast = useCustomToast();

  const changePasswordSubmitHandler = async (
    formData: ChangePasswordFormFields
  ) => {
    const { oldPassword, newPassword } = formData;

    await mutateAsync({
      oldPassword,
      newPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ msg: "Your password has been changed successfully" });
      router.back();
    }
  }, [isSuccess]);

  const cancelHanlder = () => {
    router.back();
  };

  return (
    <div>
      <ChangePasswordModal
        changePasswordSubmitHandler={changePasswordSubmitHandler}
        isLoading={isPending}
        error={error?.errorResponse?.message || error?.errorMessage}
        cancelHandler={cancelHanlder}
      />
    </div>
  );
}
