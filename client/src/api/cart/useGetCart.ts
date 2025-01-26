import asyncHandler from "@/utils/asyncHandler";
import { Cart } from "./CartTypes";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

const getCart = async (): Promise<Cart> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Cart>> => axiosInstance.get("/carts")
  );
};

const useGetCart = () => {
  return useQuery({
    queryKey: ["get-cart"],
    queryFn: getCart,
    throwOnError: (err: ApiError) => false,
    staleTime: 0,
    gcTime: 0,
    retry:false,
  });
};

export default useGetCart;
