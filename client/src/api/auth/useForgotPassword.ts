import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const forgotPassword = async ({
  email,
}: {
  email: string;
}): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.post("/users/forgot-password", { email })
  );
};

const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onError: (err: ApiError) => err,
  });
};

export default useForgotPassword;
