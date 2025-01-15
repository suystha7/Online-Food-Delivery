import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Food, IFoodBodyFields, IFoodParams } from "./FoodTypes";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const updateFood = async ({
  foodId,
  ...data
}: IFoodBodyFields & IFoodParams): Promise<Food> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Food>> =>
      axiosInstance.patch(
        `foods/${foodId}`,
        { ...data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
  );
};

const useUpdateFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateFood,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-foods"],
      });
    },
  });
};

export default useUpdateFood;
