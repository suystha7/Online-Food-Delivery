import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Category } from "./CategoryTypes";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import ApiError from "../ApiError";

const getCategory = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<Category> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Category>> =>
      axiosInstance.get(`/categories/${categoryId}`)
  );
};

const useGetCategory = ({ categoryId }: { categoryId: string }) => {
  return useQuery({
    queryKey: ["get-category", `${categoryId}`],
    queryFn: () => getCategory({ categoryId }),
    throwOnError: (err: ApiError) => false,
  });
};

export default useGetCategory;
