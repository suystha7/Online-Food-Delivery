import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const logout = async (): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> => axiosInstance.post("/users/logout")
  );
};

const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onError: (err: ApiError) => err,
  });
};

export default useLogout
