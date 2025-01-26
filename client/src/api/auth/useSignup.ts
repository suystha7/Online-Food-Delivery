import { useMutation } from "@tanstack/react-query";
import asyncHandler from "@/utils/asyncHandler";
import axiosInstance from "../axiosInstance";
import ApiError from "../ApiError";
import ApiResponse from "../ApiResponse";
import { User } from "./AuthTypes";

const signup = async ({
  email,
  password,
  fullName,
  phoneNumber,
}: {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}): Promise<User> => {
  return await asyncHandler(
    (): Promise<ApiResponse<User>> =>
      axiosInstance.post("/users/register", {
        email,
        password,
        fullName,
        phoneNumber,
      })
  );
};

const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onError: (err: ApiError) => err,
  });
};

export default useSignup;
