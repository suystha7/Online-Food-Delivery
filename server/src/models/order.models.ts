import mongoose, { Schema,Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import {
  OrderStatusEnum,
  OrderStatusType,
  PaymentMediumEnum,
  PaymentMediumType,
} from "../constant";

interface IOrder extends Document {
  address: string;
  customer: Types.ObjectId;
  items: Array<{ foodId: Types.ObjectId; quantity: number }>;
  isPaymentDone: boolean;
  orderPrice: number;
  paymentMedium: PaymentMediumType;
  status: OrderStatusType;
}

const orderSchema = new Schema<IOrder>(
  {
    address: {
      type: String,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    },
    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    orderPrice: {
      type: Number,
      required: true,
    },
    paymentMedium: {
      type: String,
      enum: Object.values(PaymentMediumEnum),
      default: "CASH",
    },
    status: {
      type: String,
      enum: Object.values(OrderStatusEnum),
      default: "PENDING",
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseAggregatePaginate);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
