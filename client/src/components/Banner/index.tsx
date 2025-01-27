"use client";
import { Button } from "@mui/material";
import React from "react";

const Banner: React.FC = () => {
  const handleScroll = (): void => {
    if (typeof window !== "undefined") {
      const targetSection = document.getElementById("menu");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="banner bg-[#fdefc7]" id="banner">
      <div className="info1">
        <h2 className="text-brown mb-4 uppercase">
          "Good food, good company, delivered right to your door."
        </h2>
        <p>
          Craving something tasty? With our quick and easy food delivery, you
          don’t have to wait long for your favorite meals to arrive. Whether
          it's a family dinner or a solo treat, we bring the joy of great food
          and the comfort of home straight to your door. No fuss, just
          deliciousness delivered!
        </p>

        <button
          className="btn-red btn-lg no-radius mt-5"
          onClick={handleScroll}
        >
          EXPLORE FULL MENU
        </button>
      </div>
    </section>
  );
};

export default Banner;
