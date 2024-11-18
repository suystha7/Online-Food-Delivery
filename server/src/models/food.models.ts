import mongoose, { Schema } from "mongoose";
import { IImage, imageSchema } from "./user.models";

interface IFood extends Document {
  category: Schema.Types.ObjectId;
  description: string;
  discount: number;
  mainImage: IImage;
  name: string;
  price: number;
  subImages: Array<IImage>;
  stock: number;
}

const foodSchema = new Schema<IFood>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    mainImage: {
      type: imageSchema,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    subImages: {
      type: [imageSchema],
      default: [],
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model<IFood>("Food", foodSchema);
