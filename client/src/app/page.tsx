import Banner from "@/components/Banner";
import BannerSlider from "@/components/BannerSlider";
import Services from "@/container/Services";
import RecommendFoods from "@/container/RecomendedFoods";
import TopRated from "@/container/TopRated";
import Contact from "@/container/Contact";
import Category from "@/components/Category";

export default function Home() {
  return (
    <>
      <BannerSlider />
      <Category />
      <RecommendFoods />
      <Services />
      <Banner />
      <TopRated />
      <Contact />
    </>
  );
}
