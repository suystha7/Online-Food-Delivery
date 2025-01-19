import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Food, IFoodParams } from "./FoodTypes";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

const getFood = async ({ foodId }: IFoodParams): Promise<Food> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Food>> => axiosInstance.get(`/foods/${foodId}`)
  );
};

const useGetFoodById = ({ foodId }: { foodId: string }) => {
  return useQuery({
    queryKey: ["get-food", `${foodId}`],
    queryFn: () => getFood({ foodId }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetFoodById;
