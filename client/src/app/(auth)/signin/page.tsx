"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidationSchema } from "@/schema/signin.schema";
import { BUTTON_TYPES, ROUTE_PATHS, SigninFormFields } from "@/constants";
import useLogin from "@/api/auth/useLogin";
import { Button, ErrorMessage, Input } from "@/components/basic";
import { ForgotPasswordModal } from "@/components/modals";

const SignIn = () => {
  const router = useRouter();

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormFields>({
    resolver: zodResolver(signinValidationSchema),
    shouldFocusError: false,
  });

  const { mutateAsync, isPending, isSuccess, error } = useLogin();

  const signinSubmitHandler = async (formData: SigninFormFields) => {
    const { email, password } = formData;

    await mutateAsync({
      email,
      password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace(ROUTE_PATHS.home);
    }
  }, [isSuccess]);

  return (
    <>
      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          cancelHandler={() => setIsForgotPasswordModalOpen(false)}
        />
      )}

      <div>
        <h2 className="text-center">SIGN IN</h2>
        <form
          onSubmit={handleSubmit(signinSubmitHandler)}
          className="space-y-4"
        >
          {error && (
            <ErrorMessage
              message={error?.errorResponse?.message || "Something went wrong"}
            />
          )}

          <Input
            type="email"
            label="Email"
            errorMessage={errors.email?.message || ""}
            {...register("email")}
          />

          <Input
            type="password"
            label="Password"
            errorMessage={errors.password?.message || ""}
            {...register("password")}
          />

          <span
            className="block text-right text-text-light text-xs font-medium cursor-pointer hover:underline"
            onClick={() => setIsForgotPasswordModalOpen(true)}
          >
            Forgot Password?
          </span>

          <Button
            type="submit"
            buttonType={BUTTON_TYPES.primaryButton}
            isLoading={isPending}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Dont have an account?&nbsp;
          <a
            href={ROUTE_PATHS.signup}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </>
  );
};

export default SignIn;
