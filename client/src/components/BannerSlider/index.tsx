"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Pagination, Autoplay } from "swiper/modules";
import { ArrowDown } from "lucide-react";
import { Button } from "../basic";
import { BUTTON_TYPES } from "@/constants";

const banners = [
  {
    id: 1,
    image: "/banner/slide1.jpg",
    alt: "Delicious Food 1",
    title: "Discover the Taste of Excellence",
    description: "Open only: 9:30AM - 9:30PM",
  },
  {
    id: 2,
    image: "/banner/slide2.jpg",
    alt: "Delicious Food 2",
    title: "A Feast for the Senses",
    description: "Enjoy the food you love FROM Rs. 200",
  },
];

const HeroSection: FC = () => {
  const handleScroll = (): void => {
    if (typeof window !== "undefined") {
      const targetSection = document.getElementById("category");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
                    ? "md:text-left items-start"
                    : "md:text-right items-end ml-[15%]"
                }`}
              >
                <div className="flex flex-col items-center md:items-start justify-center text-center md:text-left w-[50%]">
                  <h1 className="text-6xl md:text-6xl font-bold leading-tight">
                    {banner.title}
                  </h1>
                  <p className="mt-6 text-lg md:text-2xl text-y">
                    {banner.description}
                  </p>
                  <Button
                    onClickHandler={handleScroll}
                    buttonType={BUTTON_TYPES.redButton}
                    className="mt-6 relative group"
                  >
                    <span className="">GET STARTED</span>
                    <ArrowDown
                      size={24}
                      className="absolute left-1/2 transform -translate-x-1/2 bottom-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300"
                    />
                  </Button>
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
