"use client";

import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { IconButton, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BUTTON_TYPES, ForgetPassFields, ROUTE_PATHS } from "@/constants";
import { forgetPasswordValidationSchema } from "@/schema/forgetPassword.schema";
import useForgotPassword from "@/api/auth/useForgotPassword";
import { Button, ErrorMessage } from "@/components/basic";

const ForgetPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPassFields>({
    resolver: zodResolver(forgetPasswordValidationSchema),
    shouldFocusError: false,
  });

  const { mutateAsync, isPending, isSuccess, error } = useForgotPassword();

  const signinSubmitHandler = async (formData: ForgetPassFields) => {
    const { email } = formData;

    await mutateAsync({
      email,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace(ROUTE_PATHS.home);
    }
  }, [isSuccess]);
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <div className="mb-5 relative space-y-2">
          <div className="flex items-center gap-2">
            <IconButton
              onClick={() => router.back()}
              className="mb-4"
              aria-label="Go Back"
            >
              <ArrowLeft className="text-gray-800" />
            </IconButton>
            <h2 className="text-2xl">
              Forget your Password?
            </h2>
          </div>

          <p className="text-gray-600 text-base">
            Please enter the email address associated with your account and we
            will email you a link to reset your password.
          </p>

          <form
            onSubmit={handleSubmit(signinSubmitHandler)}
            className="space-y-4 mt-5"
          >
            {error && (
              <ErrorMessage
                message={
                  error?.errorResponse?.message || "Something went wrong"
                }
              />
            )}
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Button
              type="submit"
              buttonType={BUTTON_TYPES.primaryButton}
              isLoading={isPending}
              className="w-full"
            >
              Send Request
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
