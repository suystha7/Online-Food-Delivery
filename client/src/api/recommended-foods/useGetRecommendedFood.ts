import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { Food } from "../food/FoodTypes";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

interface IRecommendResponse {
  foods: Array<Food>;
  prediction:  Record<string, { user_ratings: number; user_predictions: number }>;
}

const getRecommendedFood = async () => {
  return await asyncHandler(
    (): Promise<ApiResponse<IRecommendResponse>> =>
      axiosInstance.get(`/recommended-foods/`)
  );
};

const useGetRecommendedFood = () => {
  return useQuery({
    queryKey: ["get-recommended-foods"],
    queryFn: () => getRecommendedFood(),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetRecommendedFood;
