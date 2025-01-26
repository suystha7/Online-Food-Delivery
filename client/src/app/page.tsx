"use client";

import Banner from "@/components/Banner";
import BannerSlider from "@/components/BannerSlider";
import Services from "@/container/Services";
import TopRated from "@/container/TopRated";
import Contact from "@/container/Contact";
import Category from "@/components/Category";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import useGetCurrentUser from "@/api/auth/useGetCurrentUser";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecommendedFood from "@/components/RecommendedFood";
import useGetAverageRating from "@/api/rating/useGetAverateRating";
import Spinner from "@/components/icons/Spinner";
import PopularFood from "@/components/PopularFood";
import useGetRatings from "@/api/rating/useGetRatings";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [isVisible, setIsVisible] = useState(false);

  const { data: averageRatingData, isPending } = useGetAverageRating();

  const { data: userData } = useGetCurrentUser();

  const { data: ratingData, isPending: isRatingDataPending } = useGetRatings({
    page: 1,
    limit: 0,
  });

  // Function to toggle the visibility of the scroll to top button
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (isPending || isRatingDataPending) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header />

      <BannerSlider />

      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Menu
        selectedCategory={selectedCategory}
        averageRatingData={averageRatingData!}
      />

      <PopularFood averageRatingData={averageRatingData!} />

      {userData && ratingData!.totalRatings > 3 && (
        <RecommendedFood averageRatingData={averageRatingData!} />
      )}

      {/* <Services /> */}
      {/* <Banner /> */}
      {/* <TopRated /> */}
      {/* <Contact /> */}

      {/* <Footer /> */}

      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 right-6 p-3 rounded-full bg-brown text-white shadow-lg transition-opacity duration-300 transform ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } hover:scale-110 hover:animate-bounce`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </>
  );
}
