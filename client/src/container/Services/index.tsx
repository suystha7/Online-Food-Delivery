import Image from "next/image";
import React from "react";

const servicesData = [
  {
    id: 1,
    icon: "/icon5.png",
    title: "ORIGINAL RECIPES",
    description:
      "Porta semper lacus cursus, feugiat primis ultrice a ligula risus auctor an tempus feugiat dolor lacinia cubiliaandrt curae integer orci congue and metus integer primis in integer metus",
  },
  {
    id: 2,
    icon: "/icon6.png",
    title: "FRESH INGREDIENTS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    icon: "/icon7.png",
    title: "FAST DELIVERY",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin ut aliquam orci.",
  },
];

const Services: React.FC = () => {
  return (
    <section className="text-center services py-5 bg-y">
      <div className="flex items-center justify-center gap-10">
        {servicesData.map((service) => (
          <div key={service.id} className="box p-5 text-center w-[33%]">
            <Image
              src={service.icon}
              alt={service.title}
              width={100}
              height={100}
              className="m-auto"
            />
            <h3 className="mt-4">{service.title}</h3>
            <p className="mt-3 mb-8 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
