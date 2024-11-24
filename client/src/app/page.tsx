import Banner from "@/components/Banner";
import BannerSlider from "@/components/BannerSlider";
import Services from "@/container/Services";
import RecommendFoods from "@/container/RecomendedFoods";
import TopRated from "@/container/TopRated";
// import Category from "@/container/Category";
import Contact from "@/container/Contact";

export default function Home() {
  return (
    <>
      <BannerSlider />
      {/* <Category /> */}
      <RecommendFoods />
      <Services />
      <Banner />
      <TopRated />
      <Contact />
    </>
  );
}
