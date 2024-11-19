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
    image: "/banner/food1.webp",
    alt: "Delicious Food 1",
    title: "Discover the Taste of Excellence",
    description:
      "Indulge in the finest culinary creations from around the world.",
  },
  {
    id: 2,
    image: "/banner/food2.avif",
    alt: "Delicious Food 2",
    title: "A Feast for the Senses",
    description: "Savor every bite with our expertly crafted dishes.",
  },
  {
    id: 3,
    image: "/banner/food.webp",
    alt: "Delicious Food 3",
    title: "Elevate Your Dining Experience",
    description:
      "Join us for an unforgettable journey of flavors and textures.",
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
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
