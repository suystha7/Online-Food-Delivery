import { Category, ICategory } from "../models/category.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import {
  getFileLocalPath,
  getFileStaticPath,
  getMongoosePaginateOptions,
  removeLocalFile,
} from "../utils/helpers";

export const createCategory = asyncHandler<ICategory>(async (req, res) => {
  const { name } = req.body;
  const mainImage = req.file;

  const alreadyCategory = await Category.findOne({ name: name.toUpperCase() });

  if (alreadyCategory) throw new ApiError(409, "Category already exists");

  if (!mainImage) throw new ApiError(400, "Main image is required");

  const cloudinaryResponse = await uploadToCloudinary({
    localFilePath: mainImage.path,
  });

  if (!cloudinaryResponse) {
    throw new ApiError(500, "File cannot be uploaded to cloudinary");
  }

  const category = new Category({
    name,
    mainImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });

  await category.save();

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        category,
        "New category has been created successfully"
      )
    );
});

export const getAllCategories = asyncHandler<
  any,
  any,
  { page: number; limit: number }
>(async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const categoryAggregrate = Category.aggregate([{ $match: {} }]);

  const categories = await Category.aggregatePaginate(
    categoryAggregrate,
    getMongoosePaginateOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalCategories",
        docs: "categories",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        categories,
        "All categories has been fetched successfully"
      )
    );
});

export const getCategoryById = asyncHandler<any, { categoryId: string }>(
  async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);

    if (!category) throw new ApiError(404, "Category does not exist");

    return res
      .status(200)
      .json(
        new ApiResponse(200, category, "Category has been fetched successfully")
      );
  }
);

export const updateCategory = asyncHandler<ICategory, { categoryId: string }>(
  async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    let updates: Partial<ICategory> = {};

    const category = await Category.findById(categoryId);

    if (!category) throw new ApiError(404, "Category does not exist");

    if (name && name.toUpperCase() !== category.name) {
      const alreadyCategory = await Category.findOne({
        name: name.toUpperCase(),
      });

      if (alreadyCategory) throw new ApiError(409, "Category already exists");

      updates = { ...updates, name };
    }

    if (req.file) {
      const cloudinaryResponse = await uploadToCloudinary({
        localFilePath: req.file.path,
      });

      if (!cloudinaryResponse) {
        throw new ApiError(500, "File cannot be uploaded to cloudinary");
      }

      updates = {
        ...updates,
        mainImage: {
          public_id: cloudinaryResponse?.public_id,
          url: cloudinaryResponse.url,
        },
      };
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: updates,
      },
      { new: true }
    );

    if (category.mainImage.url !== updatedCategory?.mainImage.url) {
      await deleteFromCloudinary({ public_id: category.mainImage.public_id });
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedCategory,
          "Category has been updated successfully"
        )
      );
  }
);

export const removeCategory = asyncHandler<any, { categoryId: string }>(
  async (req, res) => {
    const { categoryId } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) throw new ApiError(404, "Category does not exist");

    await deleteFromCloudinary({
      public_id: deletedCategory.mainImage.public_id,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Category has been updated successfully")
      );
  }
);
