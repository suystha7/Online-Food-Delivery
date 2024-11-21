
import Banner from "@/container/Banner";
import BannerSlider from "@/components/BannerSlider";
import FilterProducts from "@/components/FilterProducts";
import Services from "@/container/Services";

export default function Home() {
  return (
    <>
      <BannerSlider />
      <FilterProducts />
      <Banner />
      <Services />
    </>
  );
}
