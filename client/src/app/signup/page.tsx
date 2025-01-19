"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupValidationSchema } from "@/schema/signup.schema";
import { BUTTON_TYPES, ROUTE_PATHS, SignupFormFields } from "@/constants";
import useSignup from "../../api/auth/useSignup";
import { Button } from "@/components/basic";
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

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
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-center">SIGN UP</h2>
        <p className="text-center text-sm my-2">
          Already have an account?{" "}
          <a
            href={ROUTE_PATHS.signin}
            className="text-blue-600 hover:underline"
          >
            Sign In
          </a>
        </p>
        <form
          onSubmit={handleSubmit(signupSubmitHandler)}
          className="space-y-4"
        >
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

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
            label="Phone Number"
            variant="outlined"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
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

          <TextField
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography
            component={"div"}
            sx={{
              color: "text.secondary",
              mt: 3,
              typography: "caption",
              textAlign: "center",
            }}
          >
            {"By signing up, I agree to "}
            <Link underline="always" color="text.primary">
              Terms of service
            </Link>
            {" and "}
            <Link underline="always" color="text.primary">
              Privacy Policy
            </Link>
          </Typography>

          <Button
            type="submit"
            isLoading={isPending}
            buttonType={BUTTON_TYPES.primaryButton}
            onClickHandler={() => {}}
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

export default SignUp;
