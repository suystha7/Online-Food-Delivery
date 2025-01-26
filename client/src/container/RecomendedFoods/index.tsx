"use client";

import React from "react";
import useGetAllFoods from "@/api/food/useGetAllFoods";
import FoodCard from "../../components/FoodCard";

const RecommendFoods: React.FC = () => {
  const { data } = useGetAllFoods({ page: 1, limit: 0 });

  return (
    // <section className="px-10" id="">
    //   <div>hello</div>
    //   {/* <div className="flex gap-10">
    //     {data?.foods.map((food) => (
    //       <FoodCard key={food._id} food={food} />
    //     ))}
    //   </div> */}
    // </section>
    <div className="text-red-800 text-3xl bg-green-400">hello</div>
  );
};

export default RecommendFoods;
