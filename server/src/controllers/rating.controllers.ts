import { Food } from "../models/food.models";
import { Rating } from "../models/rating.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { getMongoosePaginateOptions } from "../utils/helpers";
import { spawn } from "child_process";

export const createUpdateRating = asyncHandler(async (req, res) => {
  const { rating } = req.body;
  const { foodId } = req.params;
  const userId = req.user?._id;

  const food = await Food.findById(foodId);

  if (!food) {
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

  const python = spawn("python", [
    "src/add_rating.py",
    JSON.stringify({ ProductId: foodId, UserId: req.user?._id, Score: rating }),
  ]);

  python.stdout.on("data", function (data) {});

  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  python.on("close", (code) => {
    if (code === 0) {
      console.log("done");
    }
  });

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Food has been rated successfully"));
});

export const getRatings = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const ratingAggregate = Rating.aggregate([
    {
      $match: {
        ratedBy: req.user?._id,
      },
    },
    {
      $lookup: {
        from: "foods",
        localField: "foodId",
        foreignField: "_id",
        as: "food",
        pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
              mainImage: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        food: { $first: "$food" },
        rating: 1,
        createdAt: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  const ratings = await Rating.aggregatePaginate(
    ratingAggregate,
    getMongoosePaginateOptions({
      page: page as number,
      limit: limit as number,
      customLabels: {
        totalDocs: "totalRatings",
        docs: "ratings",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, ratings, "Ratings has been fetched successfully")
    );
});

export const removeRating = asyncHandler(async (req, res) => {
  const { ratingId } = req.params;

  const deletedRating = await Rating.findByIdAndDelete(ratingId);

  if (!deletedRating) {
    throw new ApiError(404, "Rating does not exist");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Rating has been removed successfully"));
});

export const getAverageRating = asyncHandler(async (req, res) => {
  let dataToSend = "";

  const python = spawn("python", ["src/average_rating.py"]);

  python.stdout.on("data", function (data) {
    dataToSend += data;
  });

  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  python.on("close", async (code) => {
    if (code === 0) {
      const response: Array<{ ProductId: string; AverageRating: number }> =
        JSON.parse(dataToSend);

      const result = response.reduce<Record<string, { AverageRating: number }>>(
        (res, curr) => {
          const { ProductId, ...rest } = curr;
          res[ProductId] = rest;
          return res;
        },
        {}
      );

      res.json(new ApiResponse(200, result, "data has been sent"));
    }
  });
});
