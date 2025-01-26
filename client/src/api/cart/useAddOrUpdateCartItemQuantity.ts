import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Cart } from "./CartTypes";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const addOrUpdateCartItemQuantity = async ({
  foodId,
  quantity,
}: {
  foodId: string;
  quantity: number;
}): Promise<Cart> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Cart>> =>
      axiosInstance.post(`/carts/item/${foodId}`, { quantity })
  );
};

const useAddOrUpdateCartItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrUpdateCartItemQuantity,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
  });
};

export default useAddOrUpdateCartItemQuantity;
