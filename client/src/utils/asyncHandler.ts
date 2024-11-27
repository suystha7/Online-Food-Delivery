import ApiError, { ApiErrorResponse } from "@/api/ApiError";
import ApiResponse from "@/api/ApiResponse";
import { AxiosError } from "axios";

const asyncHandler = async <T>(
  fn: () => Promise<ApiResponse<T>>
): Promise<T> => {
  return Promise.resolve(fn())
    .then((response) => response.data)
    .catch((err: AxiosError<ApiErrorResponse>) => {
      throw new ApiError(err.message, err, err.response?.data);
    });
};

export default asyncHandler;
