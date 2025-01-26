import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { User } from "./AuthTypes";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const updateProfile = async ({
  fullName,
  phoneNumber,
  avatar,
}: {
  fullName?: string;
  phoneNumber?: string;
  avatar?: File;
}): Promise<User> => {
  return await asyncHandler(
    (): Promise<ApiResponse<User>> =>
      axiosInstance.patch(
        "/users/profile",
        { fullName, phoneNumber, avatar },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
  );
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });
};

export default useUpdateProfile;
