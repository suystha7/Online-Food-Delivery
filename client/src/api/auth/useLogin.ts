import asyncHandler from "@/utils/asyncHandler";
import { LoginResponse } from "./AuthTypes";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  return await asyncHandler(
    (): Promise<ApiResponse<LoginResponse>> =>
      axiosInstance.post("/users/login", { email, password })
  );
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: (err: ApiError) => err,
  });
};

export default useLogin;
