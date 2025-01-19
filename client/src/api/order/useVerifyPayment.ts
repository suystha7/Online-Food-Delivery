import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";

const verifyPayment = async ({ orderId }: { orderId: string }) => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.post(`/orders/payment/${orderId}`)
  );
};

const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: verifyPayment,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-orders", "all"],
      });
    },
  });
};

export default useVerifyPayment;
