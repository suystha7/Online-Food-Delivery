"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { PopularDishesProps } from "@/lib/types";
import Link from "next/link";
import DishCard from "@/components/DishCard";

const PopularDishesCarousel: FC<PopularDishesProps> = ({ dishes }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
        Popular Dishes
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation
        modules={[Navigation]}
        className="mySwiper"
      >
        {dishes.map((dish) => (
          <SwiperSlide key={dish.id}>
            <DishCard dish={dish} />
          </SwiperSlide>
        ))}

        <div className="text-center mt-6">
          <Link href="/menu">
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300">
              See more
            </button>
          </Link>
        </div>
      </Swiper>
    </div>
  );
};

export default PopularDishesCarousel;
