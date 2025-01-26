import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

const getAverageRating = async () => {
  return await asyncHandler(
    (): Promise<ApiResponse<Record<string, { AverageRating: number }>>> =>
      axiosInstance.get(`/ratings/average-rating/`)
  );
};

const useGetAverageRating = () => {
  return useQuery({
    queryKey: ["get-average-rating"],
    queryFn: () => getAverageRating(),
    throwOnError: (err: ApiError) => false,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export default useGetAverageRating;
