import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler";
import { Order } from "../models/order.models";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { OrderStatusEnum, OrderStatusType } from "../constant";
import { getMongoosePaginateOptions } from "../utils/helpers";

const frontend_url = "http://localhost:3000/orderSuccess";

export const placeOrder = asyncHandler(async (req, res) => {
  const { fullName, address, phoneNumber, paymentMethod, orderPrice, items } =
    req.body;

  const order = await Order.create({
    fullName,
    address,
    city: req.body?.city || "",
    postalCode: req.body?.postalCode || "",
    phoneNumber,
    paymentMethod,
    orderPrice,
    items: items,
    customer: req.user?._id,
  });

  if (paymentMethod === "ONLINE") {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

    const nepaliRupeesToCents = (amountInNPR: number) =>
      Math.round(amountInNPR * 100);

    const lineItems = req.body.items.map(
      (item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: "npr",
          product_data: {
            name: item.name,
          },
          unit_amount: nepaliRupeesToCents(item.price),
        },
        quantity: item.quantity,
      })
    );

    lineItems.push({
      price_data: {
        currency: "npr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: nepaliRupeesToCents(50),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${frontend_url}?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}?success=false&orderId=${order._id}`,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { url: session.url },
          "New order has been created successfully"
        )
      );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { url: `${frontend_url}?success=true&orderId=${order._id}` },
        "New order has been created successfully"
      )
    );
});

export const getAllOrdersAdmin = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const orderAggregate = Order.aggregate([
    {
      $match: {},
    },
  ]);

  const orders = await Order.aggregatePaginate(
    orderAggregate,
    getMongoosePaginateOptions({
      page: page as number,
      limit: limit as number,
      customLabels: {
        totalDocs: "totalOrders",
        docs: "orders",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, orders, "All Orders has been fetched successfully")
    );
});

export const getOrdersByUserId = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const orderAggregate = Order.aggregate([
    {
      $match: { customer: req.user?._id },
    },
  ]);

  const orders = await Order.aggregatePaginate(
    orderAggregate,
    getMongoosePaginateOptions({
      page: page as number,
      limit: limit as number,
      customLabels: {
        totalDocs: "totalOrders",
        docs: "orders",
      },
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders,
        "All Orders of given customer has been fetched successfully"
      )
    );
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        order,
        "Order payment has been verified successfully"
      )
    );
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order does not exist");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        isPaymentDone: true,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, true, "Order payment has been verified successfully")
    );
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order does not exist");
  }

  if (order.status === "DELIVERED") {
    throw new ApiError(400, "Food order has been already delivered");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    {
      $set: {
        status,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, true, "Order status has been updated successfully")
    );
});

export const removeOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const deletedOrder = await Order.findByIdAndDelete(orderId);

  if (!deletedOrder) {
    throw new ApiError(404, "Order does not exist");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, true, "Order payment has been deleted successfully")
    );
});

// export const getAllOrdersAdmin = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 5 } = req.query;

//   const orderAggregate = Order.aggregate([
//     {
//       $match: {},
//     },

//     { $unwind: "$items" },

//     {
//       $lookup: {
//         from: "foods",
//         localField: "items.foodId",
//         foreignField: "_id",
//         as: "items.food",
//       },
//     },

//     { $addFields: { "items.food": { $first: "$items.food" } } },

//     {
//       $group: {
//         _id: "$_id",
//         order: { $first: "$$ROOT" },
//         orderItems: {
//           $push: {
//             _id: "$items._id",
//             quantity: "$items.quantity",
//             food: "$items.food",
//           },
//         },
//       },
//     },
//     {
//       $addFields: {
//         "order.items": "$orderItems",
//       },
//     },
//     {
//       $project: {
//         orderItems: 0,
//       },
//     },
//   ]);

//   const orders = await Order.aggregatePaginate(
//     orderAggregate,
//     getMongoosePaginateOptions({
//       page: page as number,
//       limit: limit as number,
//       customLabels: {
//         totalDocs: "totalOrders",
//         docs: "orders",
//       },
//     })
//   );

//   return res
//     .status(200)
//     .json(new ApiResponse(200, orders, "All Orders has been fetched successfully"));
// });
