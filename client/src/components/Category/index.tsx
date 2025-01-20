"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetAllCategories from "@/api/category/useGetAllCategories";
import { getCapitalizedForm } from "@/utils/helpers";
import "swiper/css";

interface ICategoryProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const Category = ({
  selectedCategory,
  setSelectedCategory,
}: ICategoryProps) => {
  const { data } = useGetAllCategories({ page: 1, limit: 0 });

  // const [activeCategory, setCategoryProduct] = useState<string>("");

  const handleProductClick = (id: string) => {
    setSelectedCategory(id === selectedCategory ? "" : id);
  };
  return (
    <section className="py-10 px-20" id="category">
        <Swiper
          slidesPerView={8}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="category-swiper"
        >
          {data?.categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div
                className={`flex justify-center items-center text-center p-4 ${
                  selectedCategory === category._id ? "active" : ""
                }`}
              >
                <div
                  className="flex flex-col  items-center cursor-pointer"
                  onClick={() => handleProductClick(category._id)}
                >
                  <Image
                    src={category.mainImage.url}
                    alt={"Category Image"}
                    width={60}
                    height={60}
                  />
                  <h4 className="text-lg text-black font-semibold cursor-pointer mt-1">
                    {getCapitalizedForm({ sentence: category.name })}
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  );
};

export default Category;
