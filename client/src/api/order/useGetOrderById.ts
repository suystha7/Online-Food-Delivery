import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { OrderItem } from "./OrderTypes";

const getOrderById = async ({ orderId }: { orderId: string }) => {
  return await asyncHandler(
    (): Promise<ApiResponse<OrderItem>> =>
      axiosInstance.get(`/orders/${orderId}`)
  );
};

const useGetOrderById = ({ orderId }: { orderId: string }) => {
  return useQuery({
    queryKey: ["get-order", `${orderId}`],
    queryFn: () => getOrderById({ orderId }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetOrderById;
