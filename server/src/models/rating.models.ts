import mongoose, { AggregatePaginateModel, Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

export interface IRating extends Document {
  rating: number;
  ratedBy: Types.ObjectId;
  foodId: Types.ObjectId;
}

const ratingSchema = new Schema<IRating>(
  {
    rating: {
      type: Number,
      required: true,
    },
    ratedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodId: {
      type: Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
  },
  { timestamps: true }
);

ratingSchema.plugin(mongooseAggregatePaginate);

interface RatingModel<T extends Document> extends AggregatePaginateModel<T> {}

export const Rating: RatingModel<IRating> = mongoose.model<IRating>(
  "Rating",
  ratingSchema
) as RatingModel<IRating>;
