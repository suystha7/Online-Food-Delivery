"use client";

import React from "react";
import FoodCard from "../../components/FoodCard";
import useGetPopularFood from "@/api/recommended-foods/useGetPopularFood";

interface IPopularFoodProps {
  averageRatingData: Record<string, { AverageRating: number }>;
}

export default function PopularFood({
  averageRatingData,
}: IPopularFoodProps) {
  const { data } = useGetPopularFood();

  return (
    <section className="py-10 px-20" id="popular-foods">
      <h3 className="text-4xl tracking-wider text-secondary font-bold mb-8">
        Popular Foods
      </h3>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-10">
        {data?.foods.map((food) => (
          <FoodCard
            key={food._id}
            food={food}
            rank={data.popularity[food._id].Rank}
            rating={averageRatingData[food._id].AverageRating}
          />
        ))}
      </div>
    </section>
  );
}
