"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BUTTON_TYPES,
  ForgotPasswordFormFields,
} from "@/constants";
import { Button, ErrorMessage, Input, Modal } from "../basic";
import { forgotPasswordValidationSchema } from "@/schema/forgetPassword.schema";
import useForgotPassword from "@/api/auth/useForgotPassword";
import { useEffect } from "react";
import useCustomToast from "@/hooks/useCustomToast";

interface IForgotPasswordModalProps {
  cancelHandler: () => void;
}

export default function ForgotPasswordModal(props: IForgotPasswordModalProps) {
  const { cancelHandler } = props;

  const { mutateAsync, isSuccess, error, isPending } = useForgotPassword();

  const toast = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormFields>({
    resolver: zodResolver(forgotPasswordValidationSchema),
    shouldFocusError: false,
  });

  const forgotPasswordSubmitHandler = async (
    formData: ForgotPasswordFormFields
  ) => {
    const { email } = formData;

    await mutateAsync({
      email,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        msg: "Password reset mail has been sent to your email",
        options: { type: "info" },
      });
      cancelHandler();
    }
  }, [isSuccess]);

  return (
    <Modal
      heading="Forgot Password"
      className="px-8 py-6 w-[95%] lg:w-1/4"
      hideModal={cancelHandler}
    >
      <form
        onSubmit={handleSubmit(forgotPasswordSubmitHandler)}
        className="space-y-4"
      >
        {error && (
          <ErrorMessage
            message={error.errorResponse?.message || error.errorMessage}
          />
        )}

        <Input
          type="email"
          label="Email"
          errorMessage={errors.email?.message || ""}
          {...register("email")}
        />

        <Button
          type="submit"
          buttonType={BUTTON_TYPES.primaryButton}
          isLoading={isPending}
          className="block mx-auto"
        >
          Submit
        </Button>
      </form>
    </Modal>
  );
}
