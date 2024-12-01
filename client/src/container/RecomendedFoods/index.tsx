"use client";
import React from "react";
import ProductItem from "../../components/ProductItem";

const RecommendFoods: React.FC = () => {
  return (
    <section className="filterProducts" id="target-section">
      <div className="productList flex justify-center">
        <div className="px-5 flex items-center gap-8 justify-center">
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
