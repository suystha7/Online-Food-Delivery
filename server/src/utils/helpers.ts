import mongoose from "mongoose";
import fs from "fs";
import { Request } from "express";

export const getMongoosePaginateOptions = ({
  page = 1,
  limit = 8,
  customLabels,
}: {
  page: number;
  limit: number;
  customLabels?: mongoose.CustomLabels;
}): mongoose.PaginateOptions => {
  return {
    page,
    limit,
    pagination: true,
    customLabels: {
      pagingCounter: "serialNumber",
      ...customLabels,
    },
  };
};

export const getFileStaticPath = (req: Request, filename: string) => {
  return `${req.protocol}://${req.get("host")}/images/${filename}`;
};

export const getFileLocalPath = (filename: string) => {
  return `public/images/${filename}`;
};

export const removeLocalFile = (localPath: string) => {
  fs.unlink(localPath, (err) => {
    if (err) console.log("Error while removing local file: ", err);
    else console.log("Removed local file: ", localPath);
  });
};
