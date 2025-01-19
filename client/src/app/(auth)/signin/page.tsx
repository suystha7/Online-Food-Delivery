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
import {
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

const SignIn = () => {
  const router = useRouter();

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

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
<<<<<<< HEAD:client/src/app/(auth)/signin/page.tsx
    <>
      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          cancelHandler={() => setIsForgotPasswordModalOpen(false)}
        />
      )}

      <div>
=======
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
>>>>>>> 174a7dcb8b891ad8f2d006e79549b5fa12dad7aa:client/src/app/signin/page.tsx
        <h2 className="text-center">SIGN IN</h2>
        <p className="text-center text-sm my-2">
          Dont have an account?{" "}
          <a
            href={ROUTE_PATHS.signup}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </a>
        </p>
        <form
          onSubmit={handleSubmit(signinSubmitHandler)}
          className="space-y-4"
        >
          {error && (
            <ErrorMessage
              message={error?.errorResponse?.message || "Something went wrong"}
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

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            Submit
          </Button>

        <p className="text-center text-sm mt-4">
          Dont have an account?&nbsp;
          <a
            href={ROUTE_PATHS.signup}
            className="text-blue-600 hover:underline">
              Sign up
            </a>
          <Divider
            sx={{
              my: 2.5,
              typography: "overline",
              color: "text.disabled",
              "&::before, ::after": {
                borderTopStyle: "dashed",
              },
            }}
          >
            OR
          </Divider>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}
          >
            <IconButton>
              <FaGoogle color="#DF3E30" />
            </IconButton>
            <IconButton color="inherit">
              <FaGithub />
            </IconButton>
            <IconButton>
              <FaFacebook color="#1C9CEA" />
            </IconButton>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default SignIn;
