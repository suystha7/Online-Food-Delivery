import mongoose, { AggregatePaginateModel, Schema,Types } from "mongoose";
import { IImage, imageSchema } from "./user.models";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IFood extends Document {
  category: Types.ObjectId;
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
      default: 1,
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

foodSchema.plugin(mongooseAggregatePaginate);

interface FoodModel<T extends Document> extends AggregatePaginateModel<T> {}

export const Food: FoodModel<IFood> = mongoose.model<IFood>(
  "Food",
  foodSchema
) as FoodModel<IFood>;
