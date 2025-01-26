import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Foods } from "./FoodTypes";
import axiosInstance from "../axiosInstance";

const getFoodsByCategory = async ({
  page = 1,
  limit = 8,
  categoryId,
}: {
  page?: number;
  limit?: number;
  categoryId: string;
}): Promise<Foods> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Foods>> =>
      axiosInstance.get(`/foods/category/${categoryId}`, {
        params: {
          page,
          limit,
        },
      })
  );
};

const useGetFoodsByCategory = ({
  page,
  limit,
  categoryId,
}: {
  page?: number;
  limit?: number;
  categoryId: string;
}) => {
  return useQuery({
    queryKey: ["get-foods", `${categoryId}`],
    queryFn: () => getFoodsByCategory({ page, limit, categoryId }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetFoodsByCategory;
