import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { Food } from "../food/FoodTypes";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

interface IPopularResponse {
  foods: Array<Food>;
  popularity:  Record<string, { score: number; Rank: number }>;
}

const getPopularFood = async () => {
  return await asyncHandler(
    (): Promise<ApiResponse<IPopularResponse>> =>
      axiosInstance.get(`/recommended-foods/popular`)
  );
};

const useGetPopularFood = () => {
  return useQuery({
    queryKey: ["get-popular-foods"],
    queryFn: () => getPopularFood(),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetPopularFood;
