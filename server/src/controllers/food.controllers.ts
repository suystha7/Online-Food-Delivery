import mongoose from "mongoose";
import { Category } from "../models/category.models";
import { Food, IFood } from "../models/food.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
  getFileLocalPath,
  getFileStaticPath,
  removeLocalFile,
} from "../utils/helpers";
import { getMongoosePaginateOptions } from "../utils/helpers";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

export const createFood = asyncHandler<IFood>(async (req, res) => {
  const { name, description, category, price, stock, discount = 0 } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const categoryExists = await Category.findById(category);

  if (!categoryExists) throw new ApiError(404, "Category does not exist");

  if (!files["mainImage"] || !files["mainImage"].length)
    throw new ApiError(400, "Main image of food is required");

  const mainImageCloudinaryResponse = await uploadToCloudinary({
    localFilePath: files["mainImage"][0].path,
  });

  if (!mainImageCloudinaryResponse) {
    throw new ApiError(500, "File cannot be uploaded to cloudinary");
  }

  let subImages: { public_id: string; url: string }[] = [];

  const uploadPromises =
    files["subImages[]"] && files["subImages[]"]?.length
      ? files["subImages[]"].map(
          (image) => cloudinary.uploader.upload(image.path) // Each image upload promise
        )
      : [];

  if (uploadPromises.length !== 0) {
    const uploadResults: UploadApiResponse[] =
      await Promise.all(uploadPromises);

    subImages = uploadResults.map((result) => ({
      public_id: result.public_id,
      url: result.url,
    }));
  }

  // const subImages =
  //   files["subImages[]"] && files["subImages[]"]?.length
  //     ? files["subImages[]"].map(async (subImage) => {
  //         const cloudinaryResponse = await uploadToCloudinary({
  //           localFilePath: subImage.path,
  //         });

  //         if (!cloudinaryResponse) {
  //           throw new ApiError(500, "File cannot be uploaded to cloudinary");
  //         }

  //         return {
  //           public_id: cloudinaryResponse.public_id,
  //           url: cloudinaryResponse.url,
  //         };
  //       })
  //     : [];

  const food = await Food.create({
    name,
    description,
    category,
    price,
    stock,
    discount,
    mainImage: {
      public_id: mainImageCloudinaryResponse.public_id,
      url: mainImageCloudinaryResponse.url,
    },
    subImages,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, food, "Food item has been created successfully")
    );
});

export const getAllFoods = asyncHandler<
  any,
  any,
  { page: number; limit: number }
>(async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const foodAggregrate = Food.aggregate([{ $match: {} }]);

  const foods = await Food.aggregatePaginate(
    foodAggregrate,
    getMongoosePaginateOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalFoods",
        docs: "foods",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, foods, "All foods has been fetched successfully")
    );
});

export const getFoodsByCategory = asyncHandler<
  any,
  { categoryId: string },
  { page?: number; limit?: number }
>(async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const { categoryId } = req.params;

  const categoryExists = await Category.findById(categoryId);

  if (!categoryExists) throw new ApiError(404, "Cateogry does not exist");

  const foodAggregrate = Food.aggregate([
    {
      $match: {
        category: new mongoose.Types.ObjectId(categoryId),
      },
    },
  ]);

  const foods = await Food.aggregatePaginate(
    foodAggregrate,
    getMongoosePaginateOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalFoods",
        docs: "foods",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        foods,
        "All foods according to category has been fetched successfully"
      )
    );
});

export const getFoodById = asyncHandler<any, { foodId: string }>(
  async (req, res) => {
    const { foodId } = req.params;

    const food = await Food.findById(foodId);

    if (!food) throw new ApiError(404, "Food item does not exists");

    return res
      .status(200)
      .json(
        new ApiResponse(200, food, "Food item has been fetched successfully")
      );
  }
);

export const updateFood = asyncHandler<IFood, { foodId: string }>(
  async (req, res) => {
    const { foodId } = req.params;
    const { name, description, category, price, stock, discount } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const food = await Food.findById(foodId);

    if (!food) throw new ApiError(404, "Food does not exist");

    if (category) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) throw new ApiError(404, "Category does not exist");
    }

    const mainImage = files["mainImage"]?.length
      ? {
          url: getFileStaticPath(req, files["mainImage"][0].filename),
          localPath: getFileLocalPath(files["mainImage"][0].filename),
        }
      : food.mainImage;

    const subImages =
      files["subImages[]"] && files["subImages[]"]?.length
        ? files["subImages[]"].map((subImage) => ({
            url: getFileStaticPath(req, subImage.filename),
            localPath: getFileLocalPath(subImage.filename),
          }))
        : food.subImages;

    let updates: Partial<IFood> = {
      name,
      description,
      category,
      price,
      stock,
      discount,
      // mainImage,
      // subImages,
    };

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    const updatedFood = await Food.findByIdAndUpdate(
      foodId,
      {
        $set: filteredUpdates,
      },
      { new: true }
    );

    // if (food.mainImage.url !== updatedFood?.mainImage.url)
    //   removeLocalFile(food.mainImage.localPath);

    // if (
    //   food.subImages.length &&
    //   food.subImages[0].url !== updatedFood?.subImages[0].url
    // ) {
    //   food.subImages.forEach((subImage) => {
    //     removeLocalFile(subImage.localPath);
    //   });
    // }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedFood,
          "Food item has been updated successfully"
        )
      );
  }
);

export const removeFood = asyncHandler<any, { foodId: string }>(
  async (req, res) => {
    const { foodId } = req.params;
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) throw new ApiError(404, "Food does not exist");

    const foodImages = [deletedFood.mainImage, ...deletedFood.subImages];

    foodImages.forEach((image) => {
      deleteFromCloudinary({ public_id: image.public_id });
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, true, "Food item has been deleted successfully")
      );
  }
);
