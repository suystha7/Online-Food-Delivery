import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { Orders } from "./OrderTypes";

const getOrdersByUserId = async ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) => {
  return await asyncHandler(
    (): Promise<ApiResponse<Orders>> =>
      axiosInstance.get(`/orders`, {
        params: {
          page,
          limit,
        },
      })
  );
};

const useGetOrdersByUserId = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-orders", page],
    queryFn: () => getOrdersByUserId({ page, limit }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetOrdersByUserId;
