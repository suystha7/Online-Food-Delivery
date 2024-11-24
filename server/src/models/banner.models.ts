import mongoose, { Schema } from "mongoose";
import { IImage, imageSchema } from "./user.models";

export interface IBanner extends Document {
  image: IImage;
  alt: string;
  title: string;
  description: string;
}

const bannerSchema = new Schema<IBanner>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: imageSchema,
      required: true,
    },
    alt: {
      type: String,
      default: "Banner Image",
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.model<IBanner>("Banner", bannerSchema);
