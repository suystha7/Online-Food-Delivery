import { Types } from "mongoose";
import { Category } from "../models/category.models";
import { Food } from "../models/food.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { spawn } from "child_process";

export const getRecommendedFoods = asyncHandler(async (req, res) => {
  let dataToSend = "";

  const python = spawn("python", [
    "src/recommended_foods.py",
    JSON.stringify({ user_id: req.user?._id }),
  ]);

  python.stdout.on("data", function (data) {
    dataToSend += data;
  });

  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  python.on("close", async (code) => {
    if (code === 0) {
      const response: Array<{
        ProductId: string;
        user_ratings: number;
        user_predictions: number;
      }> = JSON.parse(dataToSend);

      const result = response.reduce<
        Record<string, { user_ratings: number; user_predictions: number }>
      >((res, curr) => {
        const { ProductId, ...rest } = curr;
        res[ProductId] = rest;
        return res;
      }, {});

      const foodIdArr: Array<string> = Object.keys(result).slice(0, 5);

      const foods = await Food.find({});

      const filteredFoods = foods.filter((food) =>
        foodIdArr.includes(food._id.toString())
      );

      const sortedFoods = filteredFoods.sort((foodA, foodB) => {
        const valueA = result[foodA._id.toString()].user_predictions;
        const valueB = result[foodB._id.toString()].user_predictions;
        return valueB - valueA;
      });

      res.json(
        new ApiResponse(
          200,
          { foods: sortedFoods, prediction: result },
          "Data has been sent successfully"
        )
      );
    }
  });
});

export const getSimilarFoods = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  let dataToSend = "";

  const python = spawn("python", [
    "src/related_foods.py",
    JSON.stringify({ product_id: foodId }),
  ]);

  python.stdout.on("data", function (data) {
    dataToSend += data;
  });

  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  python.on("close", async (code) => {
    if (code === 0) {
      const response: Array<{ ProductId: string; "Similarity Score": number }> =
        JSON.parse(dataToSend);

      const result = response.reduce<
        Record<string, { "Similarity Score": number }>
      >((res, curr) => {
        const { ProductId, ...rest } = curr;
        res[ProductId] = rest;
        return res;
      }, {});

      const foodIdArr: Array<string> = Object.keys(result);

      const foods = await Food.find({});

      const filteredFoods = foods.filter((food) =>
        foodIdArr.includes(food._id.toString())
      );

      
      const sortedFoods = filteredFoods.sort((foodA, foodB) => {
        const valueA = result[foodA._id.toString()]["Similarity Score"];
        const valueB = result[foodB._id.toString()]["Similarity Score"];
        return valueB - valueA;
      });

      res.json(
        new ApiResponse(
          200,
          { foods: sortedFoods, similarityScore: result },
          "Data has been sent successfully"
        )
      );
    }
  });
});

export const getPopularFoods = asyncHandler(async (req, res) => {
  let dataToSend = "";

  const python = spawn("python", [
    "src/popular_foods.py",
  ]);

  python.stdout.on("data", function (data) {
    dataToSend += data;
  });

  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  python.on("close", async (code) => {
    if (code === 0) {
      const response: Array<{
        ProductId: string;
        score: number;
        Rank: number;
      }> = JSON.parse(dataToSend);

      const result = response.reduce<
        Record<string, { score: number; Rank: number }>
      >((res, curr) => {
        const { ProductId, ...rest } = curr;
        res[ProductId] = rest;
        return res;
      }, {});

      const foodIdArr: Array<string> = Object.keys(result);

      const foods = await Food.find({});

      const filteredFoods = foods.filter((food) =>
        foodIdArr.includes(food._id.toString())
      );

      const sortedFoods = filteredFoods.sort((foodA, foodB) => {
        const valueA = result[foodA._id.toString()].score;
        const valueB = result[foodB._id.toString()].score;
        return valueB - valueA;
      });

      res.json(
        new ApiResponse(
          200,
          { foods: sortedFoods, popularity: result },
          "Data has been sent successfully"
        )
      );
    }
  });
});
