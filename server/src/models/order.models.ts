import mongoose, { Schema, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import {
  OrderStatusEnum,
  OrderStatusType,
  PaymentMediumEnum,
  PaymentMediumType,
} from "../constant";
import { AggregatePaginateModel } from "mongoose";
import { IImage, imageSchema } from "./user.models";

interface IOrder extends Document {
  address: string;
  fullName: string;
  city: string;
  postalCode: string;
  phoneNumber: string;
  customer: Types.ObjectId;
  items: Array<{
    foodId: Types.ObjectId;
    name: string;
    price: number;
    mainImage: IImage;
    quantity: number;
  }>;
  isPaymentDone: boolean;
  orderPrice: number;
  paymentMethod: PaymentMediumType;
  status: OrderStatusType;
}

const orderSchema = new Schema<IOrder>(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: false,
    },
    phoneNumber: {
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
          mainImage: {
            type: imageSchema,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            default: 1,
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
    paymentMethod: {
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

interface OrderModel<T extends Document> extends AggregatePaginateModel<T> {}

export const Order: OrderModel<IOrder> = mongoose.model<IOrder>(
  "Order",
  orderSchema
) as OrderModel<IOrder>;
