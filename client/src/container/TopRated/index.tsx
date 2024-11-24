"use client";
import ProductItem from "@/components/ProductItem";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper styles
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Don't forget to install the Swiper package if you haven't done so:
// npm install swiper

const TopRated = () => {
  return (
    <div className="productItem_1" id="menu">
      <section className="menu">
        <div className="container mx-auto text-center">
          <h2 className="">Top Rated Foods</h2>
          <p className="text-lg">
            Aliquam a augue suscipit, luctus neque purus ipsum neque undo dolor
            primis <br /> libero tempus, blandit a cursus varius magna
          </p>

          <Swiper
            spaceBetween={20}
            slidesPerView={4}
            navigation
            autoplay={{
              delay: 3000, // 3-second autoplay interval
              disableOnInteraction: false, // Keep autoplay on interaction
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="productListing mt-4"
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
              <ProductItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default TopRated;
