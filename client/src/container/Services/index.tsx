import Image from "next/image";
import React from "react";

const servicesData = [
  {
    id: 1,
    icon: "/icon5.png",
    title: "ORIGINAL RECIPES",
    description:
      "Experience the magic of authentic, original recipes right at your fingertips",
  },
  {
    id: 2,
    icon: "/icon6.png",
    title: "FRESH INGREDIENTS",
    description:
      "At the heart of every dish is the commitment to using only the freshest ingredients",
  },
  {
    id: 3,
    icon: "/icon7.png",
    title: "FAST DELIVERY",
    description:
      "You can count on fast, reliable service that brings satisfaction, without the wait",
  },
];

const Services: React.FC = () => {
  return (
    <section className="services text-center py-16" id="services">
      <div className="flex items-center justify-center gap-8">
        {servicesData.map((service) => (
          <div key={service.id} className="box p-6 text-center w-[33%] mb-0">
            <Image
              src={service.icon}
              alt={service.title}
              width={100}
              height={100}
              className="w-20 h-20 mb-4 mx-auto text-white"
            />

            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
