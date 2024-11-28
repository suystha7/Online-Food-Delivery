import asyncHandler from "@/utils/asyncHandler";
import ApiResponse from "../ApiResponse";
import { Category } from "./CategoryTypes";
import axiosInstance from "../axiosInstance";
import { useMutation } from "@tanstack/react-query";
import ApiError from "../ApiError";

const createCategory = async ({
  name,
  mainImage,
}: {
  name: string;
  mainImage: File;
}): Promise<Category> => {
  return await asyncHandler(
    (): Promise<ApiResponse<Category>> =>
      axiosInstance.post(
        "/categories",
        { name, mainImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
  );
};

const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
    onError: (err: ApiError) => err,
  });
};

export default useCreateCategory;
