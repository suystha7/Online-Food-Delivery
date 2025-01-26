import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { Category } from "./CategoryTypes";

const updateCategory = async ({
  categoryId,
  name,
  mainImage,
}: {
  name?: string;
  mainImage?: File;
  categoryId: string;
}): Promise<Category> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Category>> =>
      axiosInstance.patch(
        `/categories/${categoryId}`,
        { name, mainImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
  );
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },
  });
};

export default useUpdateCategory;
