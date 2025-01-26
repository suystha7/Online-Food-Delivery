"use client";

import useResetPassword from "@/api/auth/useResetPassword";
import { Button, ErrorMessage, Input } from "@/components/basic";
import {
  BUTTON_TYPES,
  ResetPasswordFormFields,
  ROUTE_PATHS,
} from "@/constants";
import useCustomToast from "@/hooks/useCustomToast";
import { resetPasswordValidationSchema } from "@/schema/resetForgottenPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ResetPassword({
  params,
}: {
  params: { resetToken: string };
}) {
  const { mutateAsync, isPending, isSuccess, error } = useResetPassword();

  const router = useRouter();

  const toast = useCustomToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormFields>({
    resolver: zodResolver(resetPasswordValidationSchema),
    shouldFocusError: false,
  });

  const resetPasswordSubmitHandler = async (
    formData: ResetPasswordFormFields
  ) => {
    const { newPassword } = formData;

    await mutateAsync({
      newPassword,
      resetToken: params.resetToken,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        msg: "Password has been reset successfully",
      });
      router.push(ROUTE_PATHS.signin);
    }
  }, [isSuccess]);

  return (
    <div>
        <h2 className="text-center">Reset Password</h2>
        <form
          onSubmit={handleSubmit(resetPasswordSubmitHandler)}
          className="space-y-4"
        >
          {error && (
            <ErrorMessage
              message={error?.errorResponse?.message || "Something went wrong"}
            />
          )}

          <Input
            type="password"
            label="Password"
            errorMessage={errors.newPassword?.message || ""}
            {...register("newPassword")}
          />

          <Button
            type="submit"
            buttonType={BUTTON_TYPES.primaryButton}
            isLoading={isPending}
            className="w-full"
          >
            Reset
          </Button>
        </form>
    </div>
  );
}
