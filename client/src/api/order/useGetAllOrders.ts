import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { Orders } from "./OrderTypes";

export const getAllOrders = async ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) => {
  return await asyncHandler(
    (): Promise<ApiResponse<Orders>> =>
      axiosInstance.get(`/orders/admin`, {
        params: {
          page,
          limit,
        },
      })
  );
};

const uesGetAllOrders = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-orders", `all`, page],
    queryFn: () => getAllOrders({ page, limit }),
    throwOnError: (err: ApiError) => false,
  });
};

export default uesGetAllOrders;
