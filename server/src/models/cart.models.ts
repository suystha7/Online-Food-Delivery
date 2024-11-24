import mongoose, { Schema, Types } from "mongoose";

interface ICart extends Document {
  items: Array<{ foodId: Types.ObjectId; quantity: number }>;
  owner: Types.ObjectId;
}

const cartSchema = new Schema<ICart>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    items: {
      type: [
        {
          foodId: {
            type: Schema.Types.ObjectId,
            ref: "Food",
          },
          quantity: {
            type: Number,
            min: [1, "Minimum food quantity must be 1"],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
