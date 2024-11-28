import Banner from "@/components/Banner";
import BannerSlider from "@/components/BannerSlider";
import Services from "@/container/Services";
import RecommendFoods from "@/container/RecomendedFoods";
import TopRated from "@/container/TopRated";
import Contact from "@/container/Contact";

export default function Home() {
  return (
    <>
      <BannerSlider />
      <RecommendFoods />
      <Services />
      <Banner />
      <TopRated />
      <Contact />
    </>
  );
}
