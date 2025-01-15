import { Category, ICategory } from "../models/category.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
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

  const category = new Category({
    name,
    mainImage: {
      url: getFileStaticPath(req, mainImage.filename),
      localPath: getFileLocalPath(mainImage.filename),
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

    if (req.file)
      updates = {
        ...updates,
        mainImage: {
          url: getFileStaticPath(req, req.file?.filename),
          localPath: getFileLocalPath(req.file?.filename),
        },
      };

    console.log(updates);

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        $set: updates,
      },
      { new: true }
    );

    if (category.mainImage.url !== updatedCategory?.mainImage.url)
      removeLocalFile(category.mainImage.localPath);

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

    removeLocalFile(deletedCategory.mainImage.localPath);

    return res
      .status(200)
      .json(
        new ApiResponse(200, true, "Category has been updated successfully")
      );
  }
);
