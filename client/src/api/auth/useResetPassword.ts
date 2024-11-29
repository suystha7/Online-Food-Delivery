import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const resetPassword = async ({
  newPassword,
  resetToken,
}: {
  newPassword: string;
  resetToken: string;
}): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.post(`/users/reset-password/${resetToken}`, { newPassword })
  );
};

const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onError: (err: ApiError) => err,
  });
};

export default useResetPassword;
