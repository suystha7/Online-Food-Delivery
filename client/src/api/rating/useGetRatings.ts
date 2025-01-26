import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import { Ratings } from "./RatingTypes";

export const getRatings = async ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}) => {
  return await asyncHandler(
    (): Promise<ApiResponse<Ratings>> =>
      axiosInstance.get(`/ratings`, {
        params: {
          page,
          limit,
        },
      })
  );
};

const useGetRatings = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-ratings", page],
    queryFn: () => getRatings({ page, limit }),
    throwOnError: (err: ApiError) => false,
    refetchOnWindowFocus:false,
    retry:2,
  });
};

export default useGetRatings;
