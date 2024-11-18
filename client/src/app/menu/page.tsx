"use client";

import { FC } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { PopularDishesProps } from "../../lib/types";

const getStarRating = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars)
        .fill(<FaStar size={18} key="full" className="text-yellow-400" />)
        .map((el, i) => (
          <span key={`full-${i}`}>{el}</span>
        ))}
      {halfStar && (
        <FaStarHalfAlt size={18} key="half" className="text-yellow-400" />
      )}
      {Array(emptyStars)
        .fill(<FaRegStar size={18} key="empty" className="text-yellow-400" />)
        .map((el, i) => (
          <span key={`empty-${i}`}>{el}</span>
        ))}
    </>
  );
};

const DishCard: FC<{ dish: PopularDishesProps["dishes"][0] }> = ({ dish }) => {
  const truncatedDescription =
    dish.description.length > 30
      ? dish.description.substring(0, 30) + "..."
      : dish.description;

  return (
    <Link
      href={`/dishes/${dish.id}`}
      className="bg-slate-50 rounded-md shadow-md overflow-hidden cursor-pointer"
    >
      <img
        src={dish.image}
        alt={dish.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-gray-800 mr-2">{dish.name}</h3>

          {/* Render star rating */}
          <div className="flex text-yellow-400 gap-[2.5px]">
            {getStarRating(dish.rating)}
          </div>
        </div>

        {/* Display truncated description */}
        <p className="text-gray-600 mt-2">{truncatedDescription}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-gray-600">
            ${dish.price.toFixed(2)}
          </p>
          <button className="mt-4 w-auto py-3 px-4 bg-yellow-500 text-white font-semibold rounded-md flex items-center justify-center space-x-2">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default DishCard;
