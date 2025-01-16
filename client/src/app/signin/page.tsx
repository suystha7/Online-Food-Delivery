"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormButton } from "@/components/FormButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidationSchema } from "@/schema/signin.schema";
import { BUTTON_TYPES, ROUTE_PATHS, SigninFormFields } from "@/constants";
import useLogin from "@/api/auth/useLogin";
import { Button, ErrorMessage, Input } from "@/components/basic";

const SignIn = () => {
  const router = useRouter();

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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6  rounded-lg">
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
          <Button
            type="submit"
            buttonType={BUTTON_TYPES.primaryButton}
            isLoading={isPending}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm">
          Dont have an account?{" "}
          <a
            href={ROUTE_PATHS.signup}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
