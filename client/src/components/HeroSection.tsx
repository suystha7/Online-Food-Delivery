"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay } from "swiper/modules";
import { banners } from "@/lib/data";


const HeroSection: FC = () => {
  return (
    <section className="relative h-screen">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        direction="horizontal"
        pagination={{
          clickable: true,
          type: "bullets",
        }}
        // navigation
        modules={[Pagination, Autoplay]}
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  {banner.title}
                </h1>
                <p className="mt-4 text-lg md:text-2xl">{banner.description}</p>
                <button className="mt-8 inline-block px-8 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
                  Get Started
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
