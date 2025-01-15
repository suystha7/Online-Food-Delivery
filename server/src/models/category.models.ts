import mongoose, { AggregatePaginateModel, Schema } from "mongoose";
import { IImage, imageSchema } from "./user.models";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface ICategory extends Document {
  name: string;
  mainImage: IImage;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      set: (value: string) => value.toUpperCase(),
    },
    mainImage: {
      type: imageSchema,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.plugin(mongooseAggregatePaginate);

interface CategoryModel<T extends Document> extends AggregatePaginateModel<T> {}

export const Category: CategoryModel<ICategory> = mongoose.model<ICategory>(
  "Category",
  categorySchema
) as CategoryModel<ICategory>;
