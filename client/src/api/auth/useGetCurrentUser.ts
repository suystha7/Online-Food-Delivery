import asyncHandler from "@/utils/asyncHandler";
import { User } from "./AuthTypes";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

const getCurrentUser = async (): Promise<User> => {
  return await asyncHandler(
    (): Promise<ApiResponse<User>> => axiosInstance.get("/users/current-user")
  );
};

const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    gcTime: 0,
    throwOnError: (err: ApiError) => false,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetCurrentUser;
