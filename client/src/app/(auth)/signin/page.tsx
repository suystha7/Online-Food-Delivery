  "use client";
  import React, { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { signinValidationSchema } from "@/schema/signin.schema";
  import { BUTTON_TYPES, ROUTE_PATHS, SigninFormFields } from "@/constants";
  import useLogin from "@/api/auth/useLogin";
  import { Button } from "@/components/basic";
  import {
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
  } from "@mui/material";
  import Link from "next/link";
  import { FaEye, FaEyeSlash, FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

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

    const { mutateAsync, isPending, isSuccess } = useLogin();

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
    }, [isSuccess, router]);

    // const errorMessage = error?.errorResponse?.message  || "Something went wrong";

    return (
      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-center">SIGN IN</h2>
          <p className="text-center text-sm my-2">
            Dont have an account?{" "}
            <Link href={ROUTE_PATHS.signup}   legacyBehavior>
              <a className="text-blue-600 hover:underline">Sign Up</a>
            </Link>
          </p>
          <form onSubmit={handleSubmit(signinSubmitHandler)} className="space-y-4">
            {/* {error && <ErrorMessage message={errorMessage} />} */}

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
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <div>
                <Link href="/forgetPassword" legacyBehavior>
                  <a style={{ color: "inherit" }}>Forget Password?</a>
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
  