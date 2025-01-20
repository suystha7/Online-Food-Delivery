"use client";

import React from "react";
import useGetAllFoods from "@/api/food/useGetAllFoods";
import FoodCard from "../../components/FoodCard";
import useGetFoodsByCategory from "@/api/food/useGetFoodsByCategory";
import { Foods } from "@/api/food/FoodTypes";

interface IMenuProps {
  selectedCategory: string;
}

export default function Menu({ selectedCategory }: IMenuProps) {
  let data: Foods | undefined;

  if (selectedCategory === "") {
    const { data: foodData } = useGetAllFoods({ page: 1, limit: 0 });
    data = foodData;
  } else {
    const { data: selectedCategoryFoodData } = useGetFoodsByCategory({
      page: 1,
      limit: 0,
      categoryId: selectedCategory,
    });
    data = selectedCategoryFoodData;
  }

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
