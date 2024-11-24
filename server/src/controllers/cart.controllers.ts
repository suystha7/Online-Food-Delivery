import mongoose, { ObjectId } from "mongoose";
import { Cart } from "../models/cart.models";
import { Food } from "../models/food.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getCartAggregation = async (userId: string) => {
  const cartAggregation = await Cart.aggregate([
    {
      $match: { owner: userId },
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "foods",
        localField: "items.foodId",
        foreignField: "_id",
        as: "food",
      },
    },
    {
      $project: {
        food: { $first: "$food" },
        quantity: "$items.quantity",
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: "$$ROOT",
        },
        cartTotal: {
          $sum: {
            $multiply: ["$food.price", "$quantity"],
          },
        },
      },
    },
  ]);

  return cartAggregation[0] ?? { _id: null, items: [], cartTotal: 0 };
};

export const getUserCart = asyncHandler(async (req, res) => {
  const cart = await getCartAggregation(req.user?._id!);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart has been fetched successfully"));
});

export const addOrUpdateItemQuanitity = asyncHandler<
  { quantity: number },
  { foodId: string }
>(async (req, res) => {
  const { quantity = 1 } = req.body;
  const { foodId } = req.params;

  const cart = await Cart.findOne({ owner: req.user?._id });

  if (!cart) throw new ApiError(404, "User cart does not exist");

  const food = await Food.findById(foodId);

  if (!food) throw new ApiError(404, "Food does not exist");

  if (quantity > food.stock) {
    throw new ApiError(
      400,
      food.stock > 0
        ? `Only ${food.stock} quanitity of ${food.name} are available in stock`
        : `${food.name} is out of stock`
    );
  }

  const foodInCartIndex = cart.items.findIndex(
    (item) => item.foodId.toString() === foodId
  );

  if (foodInCartIndex !== -1) cart.items[foodInCartIndex].quantity = quantity;
  else {
    cart.items.push({
      foodId: new mongoose.Types.ObjectId(foodId),
      quantity,
    });
  }

  await cart.save({ validateBeforeSave: true });

  const updatedCart = await getCartAggregation(req.user?._id!);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedCart,
        "Cart item has been added or updated successfully"
      )
    );
});

export const removeItemFromCart = asyncHandler<any, { foodId: string }>(
  async (req, res) => {
    const { foodId } = req.params;

    const cart = await Cart.findOne({ owner: req.user?._id });

    if (!cart) throw new ApiError(404, "User cart does not exist");

    const food = await Food.findById(foodId);

    if (!food) throw new ApiError(404, "Food does not exist");

    await Cart.findByIdAndUpdate(
      cart._id,
      {
        $pull: {
          items: { foodId },
        },
      },
      { new: true }
    );

    const updatedCart = await getCartAggregation(req.user?._id!);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          updatedCart,
          "Cart item has been removed successfully"
        )
      );
  }
);

export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ owner: req.user?._id });

  if (!cart) throw new ApiError(404, "Cart does not exist");

  await Cart.findByIdAndUpdate(
    cart._id,
    {
      $set: { items: [] },
    },
    { new: true }
  );

  const updatedCart = await getCartAggregation(req.user?._id!);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedCart,
        "User cart has been cleared successfully"
      )
    );
});
