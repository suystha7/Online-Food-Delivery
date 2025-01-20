import { Category } from "../models/category.models";
import { Food } from "../models/food.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { spawn } from "child_process";

export const getRelatedFoods = asyncHandler(async (req, res) => {
  //   const { categoryId } = req.params;

  //   const category = await Category.findById(categoryId);

  //   if (!category) {
  //     throw new ApiError(404, "Category does not exist");
  //   }

  //   const foods = await Food.find({ category: categoryId });

  let dataToSend = "";

  const python = spawn("python", ["src/p.py"]);

  python.stdout.on("data", function (data) {
    dataToSend += data;
  });

  python.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  python.on("close", (code) => {
    if (code === 0) {
      const result = JSON.parse(dataToSend);
      res.json(new ApiResponse(200, result , "data has been sent"));
    }
  });
});
