import { BANNER_CNT_LIMIT } from "../constant";
import { Banner, IBanner } from "../models/banner.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { getFileLocalPath, getFileStaticPath } from "../utils/helpers";

export const createBanner = asyncHandler<IBanner>(async (req, res) => {
  const { title, description, alt } = req.body;
  const image = req.file;

  if (!image) throw new ApiError(400, "Banner image is required");

  const numOfBanners = await Banner.countDocuments();

  if (numOfBanners > BANNER_CNT_LIMIT)
    throw new ApiError(
      400,
      `At most ${BANNER_CNT_LIMIT} banners can be created`
    );

  const cloudinaryResponse = await uploadToCloudinary({
    localFilePath: image.path,
  });

  if (!cloudinaryResponse) {
    throw new ApiError(500, "File cannot be uploaded to cloudinary");
  }

  const banner = await Banner.create({
    title,
    description,
    alt,
    image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, banner, "New banner has been created successfully")
    );
});

export const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({});

  return res
    .status(200)
    .json(
      new ApiResponse(200, banners, "All banners has been fetched successfully")
    );
});

export const updateBanner = asyncHandler<IBanner, { bannerId: string }>(
  async (req, res) => {
    const { bannerId } = req.params;
    const { title, description, alt } = req.body;
    const image = req.file;

    const banner = await Banner.findById(bannerId);

    if (!banner) throw new ApiError(404, "Banner does not exist");

    let updates: Partial<IBanner> = {};

    if (title) updates = { ...updates, title };
    if (description) updates = { ...updates, description };
    if (alt) updates = { ...updates, alt };

    if (image) {
      const cloudinaryResponse = await uploadToCloudinary({
        localFilePath: image.path,
      });

      if (!cloudinaryResponse) {
        throw new ApiError(500, "File cannot be uploaded to cloudinary");
      }

      await deleteFromCloudinary({ public_id: banner.image.public_id });

      updates = {
        ...updateBanner,
        image: {
          public_id: cloudinaryResponse.public_id,
          url: cloudinaryResponse.url,
        },
      };
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      bannerId,
      {
        $set: updates,
      },
      { new: true }
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedBanner,
          "Banner has been updated successfully"
        )
      );
  }
);

export const removeBanner = asyncHandler<any, { bannerId: string }>(
  async (req, res) => {
    const { bannerId } = req.params;

    const banner = await Banner.findById(bannerId);

    if (!banner) throw new ApiError(404, "Banner does not exist");

    await Banner.findByIdAndDelete(bannerId);

    return res
      .status(201)
      .json(new ApiResponse(201, true, "Banner has been deleted successfully"));
  }
);
