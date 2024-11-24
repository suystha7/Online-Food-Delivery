"use client";
import Image from "next/image";
import React, { useState } from "react";
import ProductItem from "../../components/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";

interface Product {
  id: number;
  imageSrc: string;
  alt: string;
  title: string;
}

const RecommendFoods: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  const products: Product[] = [
    { id: 1, imageSrc: "/icon1.png", alt: "icon1", title: "BURGERS" },
    { id: 2, imageSrc: "/icon2.png", alt: "icon2", title: "DESSERTS" },
    { id: 3, imageSrc: "/icon3.png", alt: "icon3", title: "SALADS" },
    { id: 4, imageSrc: "/icon4.png", alt: "icon4", title: "SIDES" },
    { id: 5, imageSrc: "/icon1.png", alt: "icon1", title: "BURGERS" },
    { id: 6, imageSrc: "/icon2.png", alt: "icon2", title: "DESSERTS" },
    { id: 7, imageSrc: "/icon3.png", alt: "icon3", title: "SALADS" },
    { id: 8, imageSrc: "/icon4.png", alt: "icon4", title: "SIDES" },
    { id: 9, imageSrc: "/icon1.png", alt: "icon1", title: "BURGERS" },
    { id: 10, imageSrc: "/icon2.png", alt: "icon2", title: "DESSERTS" },
    { id: 11, imageSrc: "/icon3.png", alt: "icon3", title: "SALADS" },
    { id: 12, imageSrc: "/icon4.png", alt: "icon4", title: "SIDES" },
  ];

  const handleProductClick = (id: number) => {
    setActiveProduct(id === activeProduct ? null : id);
  };

  return (
    <section className="filterProducts py-10" id="target-section">
      {/* Swiper for product categories */}
      <Swiper
        slidesPerView={8}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="category-swiper mb-6"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <li
              className={`list-inline-item text-center ${
                activeProduct === product.id ? "active" : ""
              }`}
              onClick={() => handleProductClick(product.id)}
              style={{ listStyle: "none" }} // Remove default list styles
            >
              <Image
                src={product.imageSrc}
                alt={product.alt}
                width={60}
                height={60}
                className="mx-auto"
              />
              <h4 className="text-lg text-black py-2 mb-0 font-semibold">
                {product.title}
              </h4>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product List */}
      <div className="productList flex justify-center">
        <div className="container px-5 flex items-center gap-8 justify-center">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
    </section>
  );
};

export default RecommendFoods;
