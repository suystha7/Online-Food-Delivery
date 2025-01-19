import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { OrderStatusType } from "./OrderTypes";

const udpateOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatusType;
}) => {
  return await asyncHandler(
    (): Promise<ApiResponse<boolean>> =>
      axiosInstance.post(`/orders/status/${orderId}`, { status })
  );
};

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: udpateOrderStatus,
    onError: (err: ApiError) => err,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-orders", "all"],
      });
    },
  });
};

export default useUpdateOrderStatus;
