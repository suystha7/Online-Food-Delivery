"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Button, Divider, Rating } from "@mui/material";
import Link from "next/link";
import { getCapitalizedForm } from "@/utils/helpers";

const TopRated = () => {
  const products = [
    {
      id: 1,
      image: "/img1.png",
      title: "BIGIT BURGER",
      description: "Mushroom patty, vegan cheese, lettuce, tomatoes",
      price: "Rs. 380",
      rating: 2.5,
    },
    {
      id: 2,
      image: "/img1.png",
      title: "CHEESE BURGER",
      description: "Beef patty, cheddar cheese, lettuce, onions, pickles",
      price: "Rs. 450",
      rating: 4.0,
    },
    {
      id: 3,
      image: "/img1.png",
      title: "VEGAN BURGER",
      description: "Lentil patty, avocado, spinach, tomatoes",
      price: "Rs. 500",
      rating: 4.5,
    },
    {
      id: 4,
      image: "/img1.png",
      title: "CLASSIC BURGER",
      description: "Beef patty, lettuce, tomatoes, ketchup, mustard",
      price: "Rs. 350",
      rating: 3.0,
    },
    {
      id: 3,
      image: "/img1.png",
      title: "VEGAN BURGER",
      description: "Lentil patty, avocado, spinach, tomatoes",
      price: "Rs. 500",
      rating: 4.5,
    },
    {
      id: 4,
      image: "/img1.png",
      title: "CLASSIC BURGER",
      description: "Beef patty, lettuce, tomatoes, ketchup, mustard",
      price: "Rs. 350",
      rating: 3.0,
    },
  ];

  return (
    <div className="foodItem_1" id="menu">
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
            className="foodListing mt-4"
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
            {products.map((product) => (
              <SwiperSlide
                key={product.id}
                className="flex items-center justify-center overflow-hidden"
              >
                <div className="bg-white rounded-md shadow-md">
                  <div className="imgWrapper">
                    <img
                      className="ml-[15%]"
                      src={product.image}
                      alt={product.title}
                      width="70%"
                    />

                    <div className="ratingWrapper bg-orange-50 cursor-pointer flex flex-col gap-2 items-center justify-center  rounded-md p-4">
                      <Link href="" passHref>
                        <h4 className="productTitle">{product.title}</h4>
                      </Link>
                      <Rating
                        name="half-rating"
                        defaultValue={product.rating}
                        precision={0.5}
                        size="medium"
                        readOnly
                      />
                      <span className="price mt-4">{product.price}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default TopRated;
