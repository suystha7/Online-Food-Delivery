import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Food, IFoodBodyFields } from "./FoodTypes";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const createFood = async (data: IFoodBodyFields): Promise<Food> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Food>> => axiosInstance.post("/foods", { ...data })
  );
};

const useCreateFood = () => {
  return useMutation({
    mutationFn: createFood,
    onError: (err: ApiError) => err,
  });
};

export default useCreateFood;
