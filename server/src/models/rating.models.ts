import mongoose, { Schema, Types } from "mongoose";

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

export const Rating = mongoose.model<IRating>("Rating", ratingSchema);
