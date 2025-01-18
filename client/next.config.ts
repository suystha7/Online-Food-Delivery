import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/dkeeoejvg/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
