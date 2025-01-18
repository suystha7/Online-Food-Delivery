import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const placeOrder = async (data: any) => {
  return await asyncHandler(
    (): Promise<ApiResponse<{ url: string }>> =>
      axiosInstance.post("/orders", { ...data })
  );
};

const usePlaceOrder = () => {
  return useMutation({
    mutationFn: placeOrder,
    onError: (err: ApiError) => err,
  });
};

export default usePlaceOrder;
