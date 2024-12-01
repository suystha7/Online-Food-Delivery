import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Foods } from "./FoodTypes";
import axiosInstance from "../axiosInstance";

const getAllFoods = async ({
  page = 1,
  limit = 8,
}: {
  page?: number;
  limit?: number;
}): Promise<Foods> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Foods>> =>
      axiosInstance.get("/foods", {
        params: {
          page,
          limit,
        },
      })
  );
};

const useGetAllFoods = ({ page, limit }: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["get-foods"],
    queryFn: () => getAllFoods({ page, limit }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetAllFoods;
