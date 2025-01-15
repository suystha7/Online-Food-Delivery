"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormButton } from "@/components/FormButton";
import { FormInput } from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "@/schema/signup.schema";
import { BUTTON_TYPES, ROUTE_PATHS, SignupFormFields } from "@/constants";
import useSignup from "../../api/auth/useSignup";
import { Button } from "@/components/basic";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormFields>({
    resolver: zodResolver(signupValidationSchema),
    shouldFocusError: false,
  });

  const { mutateAsync, isPending, isSuccess } = useSignup();

  const router = useRouter();

  const signupSubmitHandler = async (formData: SignupFormFields) => {
    const { fullName, email, password, phoneNumber } = formData;

    await mutateAsync({
      fullName,
      email,
      password,
      phoneNumber,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      router.replace(ROUTE_PATHS.signin);
    }
  }, [isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg">
        <h2 className="text-center">SIGN UP</h2>
        <form
          onSubmit={handleSubmit(signupSubmitHandler)}
          className="space-y-4"
        >
          <FormInput
            type="text"
            label="Full Name"
            errorMessage={errors.fullName?.message || ""}
            {...register("fullName")}
          />

          <FormInput
            type="email"
            label="Email"
            errorMessage={errors.email?.message || ""}
            {...register("email")}
          />

          <FormInput
            type="number"
            label="Phone Number"
            errorMessage={errors.phoneNumber?.message || ""}
            {...register("phoneNumber")}
          />

          <FormInput
            type="password"
            label="Password"
            errorMessage={errors.password?.message || ""}
            {...register("password")}
          />

          <FormInput
            type="password"
            label="Confirm Password"
            errorMessage={errors.confirmPassword?.message || ""}
            {...register("confirmPassword")}
          />

          {/* <FormButton type="submit" isLoading={isPending}>
            Sign Up
          </FormButton> */}
          <Button
            type="submit"
            isLoading={isPending}
            buttonType={BUTTON_TYPES.primaryButton}
            onClickHandler={() => {}}
            className="w-full"
          >
            Signup
          </Button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a
            href={ROUTE_PATHS.signin}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
