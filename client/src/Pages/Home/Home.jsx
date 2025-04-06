import About from "./Sections/About";
import Bestsellers from "./Sections/Bestsellers";
import Categories from "./Sections/Categories";
import HeroSection from "./Sections/HeroSection";
import NewArrivals from "./Sections/NewArrivals";
import Newsletter from "./Sections/Newsletter";
import TrendingNow from "./Sections/TrendingNow";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <Categories />
      <NewArrivals />
      <Bestsellers/>
      <TrendingNow/>
      <About/>
      <Newsletter/>
    </main>
  );
}
