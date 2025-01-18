"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "@/schema/signup.schema";
import { BUTTON_TYPES, ROUTE_PATHS, SignupFormFields } from "@/constants";
import useSignup from "../../../api/auth/useSignup";
import { Button, Input } from "@/components/basic";

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
    <div>
      <h2 className="text-center">SIGN UP</h2>

      <form onSubmit={handleSubmit(signupSubmitHandler)} className="space-y-4">
        <Input
          type="text"
          label="Full Name"
          errorMessage={errors.fullName?.message || ""}
          {...register("fullName")}
        />

        <Input
          type="email"
          label="Email"
          errorMessage={errors.email?.message || ""}
          {...register("email")}
        />

        <Input
          type="number"
          label="Phone Number"
          errorMessage={errors.phoneNumber?.message || ""}
          {...register("phoneNumber")}
        />

        <Input
          type="password"
          label="Password"
          errorMessage={errors.password?.message || ""}
          {...register("password")}
        />

        <Input
          type="password"
          label="Confirm Password"
          errorMessage={errors.confirmPassword?.message || ""}
          {...register("confirmPassword")}
        />
        
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

      <p className="text-center text-sm mt-4">
        Already have an account?&nbsp;
        <a href={ROUTE_PATHS.signin} className="text-blue-600 hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUp;
