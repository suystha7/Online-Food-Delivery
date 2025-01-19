import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import Link from "next/link";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";
import { Food } from "@/api/food/FoodTypes";
import { Divider } from "@mui/material";

const FoodCard = ({ food }: { food: Food }) => {
  return (
    <div className="foodItem rounded-md shadow-md">
      <div className="imgWrapper flex gap-3 items-center">
        <div className="flex flex-col items-center gap-1">
          <Link href={`/food/${food._id}`} passHref>
            <Image
              src={food.mainImage.url}
              alt="Food image"
              width={80}
              height={80}
            />
          </Link>
          <div className="ratingWrapper">
            <Rating
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              size="medium"
              readOnly
            />
          </div>
        </div>

        <div className="h-full w-px bg-gray-300"></div>

        <div className="info bg-orange-50 cursor-pointer flex flex-col gap-2 items-center justify-center rounded-md p-4">
          <Link href={`/food/${food._id}`} passHref>
            <h4 className="productTitle">
              {getCapitalizedForm({ sentence: food.name })}
            </h4>
          </Link>
          <span className="price">
            {getAmountWithNepaliCurrency({ amount: food.price })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
