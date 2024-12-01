import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { IFoodParams } from "./FoodTypes";

const deleteFood = async ({ foodId }: IFoodParams): Promise<boolean> => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.delete(`/foods/${foodId}`)
  );
};

const useDeleteFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFood,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-foods"],
      });
    },
  });
};

export default useDeleteFood;
