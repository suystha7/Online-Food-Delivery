import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Food } from "@/api/food/FoodTypes";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";

const FoodCard = ({
  food,
  rating,
  score,
  rank,
  prediction,
}: {
  food: Food;
  rating?: number;
  score?: number;
  rank?: number;
  prediction?: number;
}) => {
  const router = useRouter();

  return (
    // <div className="foodItem">
    //   <div className="imgWrapper">
    //     <Link href={`/food/${food._id}`} passHref>
    //       <Image
    //         src={food.mainImage.url}
    //         alt="Food image"
    //         width={100}
    //         height={100}
    //       />
    //     </Link>

    //     <div className="ratingWrapper">
    //       <span className="price">
    //         {getAmountWithNepaliCurrency({ amount: food.price })}
    //       </span>

    //       <Rating
    //        c
    //       />
    //     </div>
    //   </div>

    //   <div className="info cursor-pointer bg-white">
    //     <Link href={`/food/${food._id}`} passHref>
    //       <h4 className="productTitle">
    //         {getCapitalizedForm({ sentence: food.name })}
    //       </h4>
    //     </Link>

    //     <p className="productDescription">{food.description}</p>

    //     {/* <Link href="#" passHref>
    //       <Button className="addToCartButton" onClick={addToCart}>
    //         ADD TO CART
    //       </Button>
    //     </Link> */}
    //   </div>
    // </div>

    <div className="relative group">
      <div className="relative group bg-white rounded-xl shadow-md overflow-hidden group-hover:blur-[1.5px]">
        <div className="">
          <img
            src={food.mainImage.url}
            alt={"Food image"}
            className="w-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col p-4">
          <span className="text-lg font-semibold text-secondary truncate tracking-wide">
            {getCapitalizedForm({ sentence: food.name })}
          </span>

          <div className="flex justify-between">
            <span className="text-base text-gray-500 font-semibold">
              {getAmountWithNepaliCurrency({ amount: food.price })}
            </span>

            {score && (
              <span className="text-base text-gray-500 font-semibold">
                Score: {score.toFixed(3)}
              </span>
            )}

            {rank && (
              <span className="text-base text-gray-500 font-semibold">
                Rank: {rank.toFixed(0)}
              </span>
            )}

            {prediction && (
              <span className="text-base text-gray-500 font-semibold">
                Prediction: {prediction.toFixed(3)}
              </span>
            )}
          </div>

          <Rating
            name="half-rating"
            defaultValue={rating}
            size="medium"
            readOnly
          />
        </div>
      </div>

      <div>
        <button
          className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0 group-hover:opacity-100 w-max  bg-accent border-2 border-accent rounded-xl  text-white hover:bg-transparent hover:text-accent cursor-pointer py-2 px-4"
          onClick={() => router.push(`/food/${food._id}`)}
        >
          See Details
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
