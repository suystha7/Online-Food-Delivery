// import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import { Food } from "@/api/food/FoodTypes";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";
import { Food } from "@/api/food/FoodTypes";
import { useRouter } from "next/navigation";

const FoodCard = ({ food }: { food: Food }) => {
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
      <div className="relative group bg-white rounded-xl shadow-md overflow-hidden group-hover:blur-[2px]">
        <div className="">
          <img
            src={food.mainImage.url}
            alt={"Food image"}
            className="w-full aspect-square object-cover"
          />
        </div>

        <div className="flex flex-col p-4">
          <span className="text-lg font-semibold text-secondary truncate">
            {getCapitalizedForm({ sentence: food.name })}
          </span>

          <span className="text-sm text-gray-500">
            {" "}
            {getAmountWithNepaliCurrency({ amount: food.price })}
          </span>

          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
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
