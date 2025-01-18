"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ALLOWED_IMAGE_FILE_TYPES,
  BUTTON_TYPES,
  UpdateProfileFormFields,
} from "@/constants";
import { updateProfileValidationSchema } from "@/schema/updateProfile.schema";
import { Button, ErrorMessage, FileInput, Input, Modal } from "../basic";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import { useEffect } from "react";

interface IProfileUpdateModalProps {
  updateProfileSubmitHandler: (formData: UpdateProfileFormFields) => void;
  error?: string;
  isLoading?: boolean;
  cancelHandler: () => void;
}

export default function ProfileUpdateModal(props: IProfileUpdateModalProps) {
  const {
    updateProfileSubmitHandler,
    error = "",
    isLoading = false,
    cancelHandler,
  } = props;

  const { data: user, isSuccess } = useGetCurrentUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileFormFields>({
    resolver: zodResolver(updateProfileValidationSchema),
    shouldFocusError: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setValue("fullName", user.fullName);
      setValue("phoneNumber", user.phoneNumber);
    }
  }, [isSuccess]);

  return (
    <Modal heading="Update Profile" className="px-8 py-6 w-[95%] lg:w-1/4" hideModal={cancelHandler}>
      <form
        onSubmit={handleSubmit(updateProfileSubmitHandler)}
        className="space-y-4"
      >
        {error && <ErrorMessage message={error} />}

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

        <FileInput
          label="Avatar"
          errorMessage={errors.avatar?.message || ""}
          register={register("avatar")}
          accept={ALLOWED_IMAGE_FILE_TYPES.toString()}
          isRequired={false}
        />

        <Button
          type="submit"
          buttonType={BUTTON_TYPES.primaryButton}
          isLoading={isLoading}
          className="block mx-auto"
        >
          Update
        </Button>
      </form>
    </Modal>
  );
}
