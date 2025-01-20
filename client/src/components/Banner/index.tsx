
"use client"
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
    <section className="banner bg-[#fdefc7]">
      <div className="info1">
        <h2 className="text-brown mb-4">
          THE BURGER TASTES BETTER WHEN <br /> YOU EAT IT WITH YOUR FAMILY
        </h2>
        <p>
          Porta semper lacus cursus, feugiat primis ultrice a ligula risus
          auctor an tempus feugiat dolor lacinia cubiliaandrt curae integer orci
          congue and metus integer primis in integer metus
        </p>

        {/* <Button className="btn-red btn-lg no-radius" onClick={handleScroll}>
          EXPLORE FULL MENU
        </Button> */}
      </div>
    </section>
  );
};

export default Banner;
