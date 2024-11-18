"use client";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide
import "swiper/css"; // Import Swiper styles
import { Autoplay } from "swiper/modules";
import { Category } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList: FC<CategoryListProps> = ({ categories = [] }) => {
  return (
    <div className="space-y-12 mb-10">
      {categories.map((category) => (
        <div key={category.id} className="px-4 md:px-8">
          {/* Swiper for category items */}
          <Swiper
            spaceBetween={20} 
            slidesPerView={1} 
            loop={true} 
            autoplay={{
              delay: 3000, 
              disableOnInteraction: false, 
              pauseOnMouseEnter: true, 
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            modules={[Autoplay]}
            className="category-swiper"
          >
            {category.items?.map((item) => (
              <SwiperSlide key={item.id}>
                <MenuItemCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
