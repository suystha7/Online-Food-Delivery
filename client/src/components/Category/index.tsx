"use client";

import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useGetAllCategories from "@/api/category/useGetAllCategories";
import { getCapitalizedForm } from "@/utils/helpers";
import "swiper/css";

interface ICategoryProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

const Category = ({selectedCategory,setSelectedCategory}:ICategoryProps) => {
  const { data } = useGetAllCategories({ page: 1, limit: 0 });

  // const [activeCategory, setCategoryProduct] = useState<string>("");

  const handleProductClick = (id: string) => {
    setSelectedCategory(id === selectedCategory ? "" : id);
  };
  return (
    <div className="p-6">
      <Swiper
        slidesPerView={8}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="category-swiper border-b border-primary"
      >
        {data?.categories.map((category) => (
          <SwiperSlide key={category._id}>
            <div
              className={`flex flex-col items-center text-center p-2 ${
                selectedCategory === category._id ? "active" : ""
              }`}
            >
              <Image
                src={category.mainImage.url}
                alt={"Category Image"}
                width={60}
                height={60}
                className="cursor-pointer"
                onClick={() => handleProductClick(category._id)}
              />
              <h4
                className="text-lg text-black font-semibold cursor-pointer my-3"
                onClick={() => handleProductClick(category._id)}
              >
                {getCapitalizedForm({ sentence: category.name })}
              </h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
