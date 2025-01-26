"use client";

import React, { useState } from "react";
import FoodCard from "../../components/FoodCard";
import useGetRecommendedFood from "@/api/recommended-foods/useGetRecommendedFood";
import { Button, Drawer } from "../basic";
import Spinner from "../icons/Spinner";
import { BUTTON_TYPES } from "@/constants";

interface IRecommendedFoodProps {
  averageRatingData: Record<string, { AverageRating: number }>;
}

export default function RecommendedFood({
  averageRatingData,
}: IRecommendedFoodProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, isPending, isSuccess } = useGetRecommendedFood();

  if (isPending) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <section className="py-10 px-20" id="recommended-foods">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl tracking-wider text-secondary font-bold">
            Recommended Foods
          </h2>

          <Button
            buttonType={BUTTON_TYPES.primaryButton}
            className="py-3"
            onClickHandler={() => setIsDrawerOpen(true)}
          >
            View Recommendation Result
          </Button>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-10">
          {data?.foods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              prediction={data.prediction[food._id].user_predictions}
              rating={averageRatingData[food._id].AverageRating}
            />
          ))}
        </div>

        {isDrawerOpen && (
          <Drawer
            isDrawerOpen={isDrawerOpen}
            className="w-full"
            heading={"Prediction Results"}
            hideDrawer={() => {
              setIsDrawerOpen(false);
            }}
          >
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 text-left">Food ID</th>
                  <th className="px-4 py-2 text-left">User Prediction</th>
                  <th className="px-4 py-2 text-left">User Rating</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data?.prediction).map((row,idx) => (
                  <tr key={idx} className="border-t border-gray-200">
                    <td className="px-4 py-2">{row[0]}</td>
                    <td className="px-4 py-2">{row[1].user_predictions}</td>
                    <td className="px-4 py-2">{row[1].user_ratings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Drawer>
        )}
      </section>
    );
  }
}
