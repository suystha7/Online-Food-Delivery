import { v2 as cloudinary } from "cloudinary";
import { removeLocalFile } from "./helpers";

export const uploadToCloudinary = async ({
  localFilePath,
}: {
  localFilePath: string;
}) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    removeLocalFile(localFilePath);
  }
};

export const deleteFromCloudinary = async ({
  public_id,
}: {
  public_id: string;
}) => {
  await cloudinary.uploader.destroy(public_id);
  console.log("File has been deleted from cloudinary successfully");
};
