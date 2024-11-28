import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const deleteCategory = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.delete(`/categories/${categoryId}`)
  );
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },
  });
};

export default useDeleteCategory;
