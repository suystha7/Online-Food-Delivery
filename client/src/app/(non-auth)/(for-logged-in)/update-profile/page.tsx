"use client";

import useUpdateProfile from "@/api/auth/useUpdateProfile";
import { ProfileUpdateModal } from "@/components/modals";
import { UpdateProfileFormFields } from "@/constants";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UpdateProfile() {
  const { mutateAsync, isPending, error, isSuccess } = useUpdateProfile();

  const router = useRouter();

  const toast = useCustomToast();

  const updateProfileSubmitHandler = async (
    formData: UpdateProfileFormFields
  ) => {
    const { fullName, phoneNumber, avatar } = formData;

    await mutateAsync({
      fullName,
      phoneNumber,
      avatar,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({ msg: "Profile has been updated successfully" });
      router.back();
    }
  }, [isSuccess]);

  const cancelHanlder = () => {
    router.back();
  };

  return (
    <div>
      <ProfileUpdateModal
        updateProfileSubmitHandler={updateProfileSubmitHandler}
        isLoading={isPending}
        error={error?.errorResponse?.message || error?.errorMessage}
        cancelHandler={cancelHanlder}
      />
    </div>
  );
}
