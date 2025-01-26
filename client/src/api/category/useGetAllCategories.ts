import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";
import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Categories } from "./CategoryTypes";
import axiosInstance from "../axiosInstance";

export const getAllCategories = async ({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
}): Promise<Categories> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Categories>> =>
      axiosInstance.get("/categories", {
        params: {
          page,
          limit,
        },
      })
  );
};

const useGetAllCategories = ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["get-categories", page],
    queryFn: () => getAllCategories({ page, limit }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetAllCategories;
