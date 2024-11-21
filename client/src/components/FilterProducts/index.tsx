"use client"
import Image from "next/image";
import React, { useState } from "react";
import ProductItem from "../../container/ProductItem";

interface Product {
  id: number;
  imageSrc: string;
  alt: string;
  title: string;
}

const FilterProducts: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  const products: Product[] = [
    { id: 1, imageSrc: "/icon1.png", alt: "icon1", title: "BURGERS" },
    { id: 2, imageSrc: "/icon2.png", alt: "icon2", title: "DESSERTS" },
    { id: 3, imageSrc: "/icon3.png", alt: "icon3", title: "SALADS" },
    { id: 4, imageSrc: "/icon4.png", alt: "icon4", title: "SIDES" },
  ];

  const handleProductClick = (id: number) => {
    setActiveProduct(id === activeProduct ? null : id); 
  };

  return (
    <section className="filterProducts py-10 min-h-screen" id="target-section">
      <div className="container mx-auto">
        <ul className="list list-inline text-center flex justify-center cursor-pointer mb-6">
          {products.map((product) => (
            <li
              key={product.id}
              className={`list-inline-item text-center ${activeProduct === product.id ? 'active' : ''}`}
              onClick={() => handleProductClick(product.id)}
            >
              <Image
                src={product.imageSrc}
                alt={product.alt}
                width={60}
                height={60}
                className="m-auto"
              />
              <h4 className="text-lg text-black py-2 mb-0 font-semibold">
                {product.title}
              </h4>
            </li>
          ))}
        </ul>

        <div className="productList">
          <div className="container px-5 flex items-center gap-8 justify-between">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterProducts;
