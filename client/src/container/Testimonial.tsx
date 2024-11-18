
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; 
import "swiper/css"; 
import { Navigation, Pagination } from "swiper/modules";
import { testimonials } from "@/lib/data";

const Testimonials: React.FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <h1 className="text-3xl font-medium title-font text-center mb-8">
          What Our Clients Say
        </h1>

        {/* Swiper Component */}
        <Swiper
          spaceBetween={30} // Space between slides
          slidesPerView={3} // Number of slides shown at once
          navigation // Enable navigation arrows
          pagination={{ clickable: true }} // Enable clickable pagination dots
          modules={[Navigation, Pagination]} // Enable Swiper modules
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={testimonial.imageUrl}
                />
                <p className="leading-relaxed">{testimonial.quote}</p>
                <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  {testimonial.name}
                </h2>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
