import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const deleteUser = async ({ userId }: { userId: string }): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> => axiosInstance.delete(`/users/${userId}`)
  );
};

const getDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
    onError: (err: ApiError) => err,
  });
};

export default getDeleteUser;
