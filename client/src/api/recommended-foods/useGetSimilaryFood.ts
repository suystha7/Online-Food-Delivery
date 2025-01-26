import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { Food } from "../food/FoodTypes";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

interface ISimilarityResponse {
  foods: Array<Food>;
  similarityScore: Record<string, { "Similarity Score": number }>;
}

const getSimilarFoods = async ({ foodId }: { foodId: string }) => {
  return await asyncHandler(
    (): Promise<ApiResponse<ISimilarityResponse>> =>
      axiosInstance.get(`/recommended-foods/similar/${foodId}`)
  );
};

const useGetSimilarFoods = ({ foodId }: { foodId: string }) => {
  return useQuery({
    queryKey: ["get-similar-foods"],
    queryFn: () => getSimilarFoods({ foodId }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetSimilarFoods;
