import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";
import HomeMetrics from "./HomeMetrics";
import HomePractice from "./HomePractice";
import HomeContribute from "./HomeContribute";

const Home = () => {
  return (
    <main className="home main">
      <HomeHero />

      <HomeFeatures />

      <HomeMetrics />

      <HomePractice />

      <HomeContribute />
    </main>
  );
};

export default Home;
