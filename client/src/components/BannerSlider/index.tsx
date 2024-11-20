"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay } from "swiper/modules";

const banners = [
  {
    id: 1,
    image: "/banner/slide1.jpg",
    alt: "Delicious Food 1",
    title: "Discover the Taste of Excellence",
    description:
      "Indulge in the finest culinary creations from around the world.",
  },
  {
    id: 2,
    image: "/banner/slide2.jpg",
    alt: "Delicious Food 2",
    title: "A Feast for the Senses",
    description: "Savor every bite with our expertly crafted dishes.",
  },
];

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
        modules={[Pagination, Autoplay]}
        className="h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div
                className={`relative z-10 container mx-auto h-full flex flex-col justify-center text-white ${
                  index === 0
                    ? "md:text-left items-start ml-auto"
                    : " md:text-right items-end mr-auto"
                }`}
              >
                <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    {banner.title}
                  </h1>
                  <p className="mt-4 text-lg md:text-2xl">
                    {banner.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
