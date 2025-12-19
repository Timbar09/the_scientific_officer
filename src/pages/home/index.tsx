import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";
import HomeMetrics from "./HomeMetrics";
import HomePractice from "./HomePractice";

const Home = () => {
  return (
    <main className="home main">
      <HomeHero />

      <HomeFeatures />

      <HomeMetrics />

      <HomePractice />
    </main>
  );
};

export default Home;
