import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Food, IFoodBodyFields } from "./FoodTypes";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const createFood = async (data: IFoodBodyFields): Promise<Food> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Food>> =>
      axiosInstance.post(
        "/foods",
        { ...data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
  );
};

const useCreateFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFood,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-foods"],
      });
    },
  });
};

export default useCreateFood;
