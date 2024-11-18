import mongoose, { Schema } from "mongoose";

interface ICart extends Document {
  items: Array<{ productId: Schema.Types.ObjectId; quantity: number }>;
  owner: Schema.Types.ObjectId;
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
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
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
