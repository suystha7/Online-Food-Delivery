import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Food, IFoodBodyFields, IFoodParams } from "./FoodTypes";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const updateFood = async ({
  foodId,
  ...data
}: IFoodBodyFields & IFoodParams): Promise<Food> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Food>> =>
      axiosInstance.patch(`foods/${foodId}`, { ...data })
  );
};

const useUpdateFood = () => {
  return useMutation({
    mutationFn: updateFood,
    onError: (err: ApiError) => err,
  });
};

export default useUpdateFood;
