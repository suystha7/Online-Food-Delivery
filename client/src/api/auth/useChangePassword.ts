import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const changePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.post("/users/change-password", { oldPassword, newPassword })
  );
};

const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onError: (err: ApiError) => err,
  });
};

export default useChangePassword
