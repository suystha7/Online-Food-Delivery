import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const deleteRating = async ({
  ratingId,
}: {
  ratingId: string;
}): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.delete(`/ratings/${ratingId}`)
  );
};

const useDeleteRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-ratings"],
      });
    },
  });
};

export default useDeleteRating;
