import { Button } from "@mui/material";
import React from "react";

const Banner: React.FC = () => {
  return (
    <section className="banner text-center bg-[#fdefc7]">
      <div className="">
        <div className="info w-[75%] m-auto">
          <h2 className="text-brown mb-4">
            THE BURGER TASTES BETTER WHEN <br /> YOU EAT IT WITH YOUR FAMILY
          </h2>
          <p className="mb-8">
            Porta semper lacus cursus, feugiat primis ultrice a ligula risus
            auctor an tempus feugiat dolor lacinia cubiliaandrt curae integer
            orci congue and metus integer primis in integer metus
          </p>

          <Button className="btn-red btn-lg no-radius">EXPLORE FULL MENU</Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
