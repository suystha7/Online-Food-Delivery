import { Food } from "../models/food.models";
import { Rating } from "../models/rating.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const createUpdateRating = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  const { foodId } = req.params;
  const userId = req.user?._id;

  const food = await Food.findById(foodId);

  if (!foodId) {
    throw new ApiError(404, "Food does not exist");
  }

  const foodRating = await Rating.findOneAndUpdate(
    {
      foodId,
      ratedBy: userId,
    },
    {
      foodId,
      ratedBy: userId,
      rating,
    },
    {
      new: true,
      upsert: true,
    }
  );

  if (!foodRating) {
    throw new ApiError(404, "Error while rating food");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Food has been rated successfully"));
});
