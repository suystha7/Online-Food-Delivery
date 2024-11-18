import Banner from "@/components/Banner";
import HeroSection from "@/components/HeroSection";
import CategoryList from "@/container/Category";
import PopularDishesCarousel from "@/container/PopularDishes";
import Services from "@/container/Services";
import Testimonials from "@/container/Testimonial";
import { categories, dishes } from "@/lib/data";


const Main = () => {
  return (
    <div>
      <HeroSection />
      <Services />
      <CategoryList categories={categories} />
      <PopularDishesCarousel dishes={dishes} />
      <Banner />
      <Testimonials />
    </div>
  );
};

export default Main;
