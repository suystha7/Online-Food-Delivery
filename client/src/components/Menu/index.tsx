"use client";

import React from "react";
import useGetAllFoods from "@/api/food/useGetAllFoods";
import useGetFoodsByCategory from "@/api/food/useGetFoodsByCategory";
import { Foods } from "@/api/food/FoodTypes";
import FoodCard from "../FoodCard";

interface IMenuProps {
  selectedCategory: string;
}

export default function Menu({ selectedCategory }: IMenuProps) {
  const { data: allFoodsData } = useGetAllFoods({ page: 1, limit: 0 });

  const { data: categoryFoodsData } = useGetFoodsByCategory({
    page: 1,
    limit: 0,
    categoryId: selectedCategory,
  });

  const data: Foods | undefined =
    selectedCategory === "" ? allFoodsData : categoryFoodsData;

  return (
    <section className="py-10 px-20" id="menu">
      <h2 className="text-4xl tracking-wider text-secondary text-center font-bold mb-8">
        Our Menu
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-10">
        {data?.foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
}
