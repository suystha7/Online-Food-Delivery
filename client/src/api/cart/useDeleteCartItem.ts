import asyncHandler from "@/utils/asyncHandler";
import { Cart } from "./CartTypes";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const deleteCartItem = async ({
  foodId,
}: {
  foodId: string;
}): Promise<Cart> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Cart>> =>
      axiosInstance.delete(`/carts/item/${foodId}`)
  );
};

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
  });
};

export default useDeleteCartItem;
