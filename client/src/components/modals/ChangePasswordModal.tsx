"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BUTTON_TYPES, ChangePasswordFormFields } from "@/constants";
import { Button, ErrorMessage, Input, Modal } from "../basic";
import { changePasswordValidationSchema } from "@/schema/changePassword.schema";

interface IChangePasswordModalProps {
  changePasswordSubmitHandler: (formData: ChangePasswordFormFields) => void;
  error?: string;
  isLoading?: boolean;
  cancelHandler: () => void;
}

export default function ChangePasswordModal(props: IChangePasswordModalProps) {
  const {
    changePasswordSubmitHandler,
    error = "",
    isLoading = false,
    cancelHandler,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormFields>({
    resolver: zodResolver(changePasswordValidationSchema),
    shouldFocusError: false,
  });

  return (
    <Modal heading="Change Password" className="px-8 py-6 w-[95%] lg:w-1/4" hideModal={cancelHandler}>
      <form
        onSubmit={handleSubmit(changePasswordSubmitHandler)}
        className="space-y-4"
      >
        {error && <ErrorMessage message={error} />}
        <Input
          type="password"
          label="Old Password"
          errorMessage={errors.oldPassword?.message || ""}
          {...register("oldPassword")}
        />
        <Input
          type="password"
          label="New Password"
          errorMessage={errors.newPassword?.message || ""}
          {...register("newPassword")}
        />
        <Button
          type="submit"
          buttonType={BUTTON_TYPES.primaryButton}
          isLoading={isLoading}
          className="block mx-auto"
        >
          Change
        </Button>
      </form>
    </Modal>
  );
}
