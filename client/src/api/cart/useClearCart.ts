import asyncHandler from "@/utils/asyncHandler";
import { Cart } from "./CartTypes";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const clearCart = async (): Promise<Cart> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Cart>> => axiosInstance.delete("/carts/clear")
  );
};

const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
  });
};

export default useClearCart;
