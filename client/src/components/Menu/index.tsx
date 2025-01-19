"use client";

import React from "react";
import useGetAllFoods from "@/api/food/useGetAllFoods";
import useGetFoodsByCategory from "@/api/food/useGetFoodsByCategory";
import FoodCard from "../../components/FoodCard";
import { Foods } from "@/api/food/FoodTypes";

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
    <section className="p-6" id="menu">
      <div className="flex gap-6 flex-wrap">
        {data?.foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </section>
  );
}
