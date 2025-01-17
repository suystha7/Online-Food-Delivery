"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinValidationSchema } from "@/schema/signin.schema";
import { BUTTON_TYPES, ROUTE_PATHS, SigninFormFields } from "@/constants";
import useLogin from "@/api/auth/useLogin";
import { Button, ErrorMessage } from "@/components/basic";
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
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
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

          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <div>
              <Link href="/forgetPassword" style={{ color: "inherit" }}>
                Forget Password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            buttonType={BUTTON_TYPES.primaryButton}
            isLoading={isPending}
            className="w-full"
          >
            Submit
          </Button>

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
    </div>
  );
};

export default SignIn;
