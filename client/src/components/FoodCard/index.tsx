import Image from "next/image";
import React from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Food } from "@/api/food/FoodTypes";
import {
  getAmountWithNepaliCurrency,
  getCapitalizedForm,
} from "@/utils/helpers";

const FoodCard = ({ food }: { food: Food }) => {
  // const { productId } = useParams();

  const { addToCart } = useCart();

  return (
    <div className="foodItem">
      <div className="imgWrapper">
        <Link href={`/food/${food._id}`} passHref>
          <Image
            src={food.mainImage.url}
            alt="Food image"
            width={100}
            height={100}
          />
        </Link>

        <div className="ratingWrapper">
          <span className="price">
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

      <div className="info cursor-pointer bg-white">
        <Link href={`/food/${food._id}`} passHref>
          <h4 className="productTitle">
            {getCapitalizedForm({ sentence: food.name })}
          </h4>
        </Link>

        <p className="productDescription">{food.description}</p>

        <Link href="#" passHref>
          <Button className="addToCartButton" onClick={addToCart}>
            ADD TO CART
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
