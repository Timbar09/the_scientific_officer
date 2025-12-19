import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";
import HomeMetrics from "./HomeMetrics";

const Home = () => {
  return (
    <main className="home main">
      <HomeHero />

      <HomeFeatures />

      <HomeMetrics />
    </main>
  );
};

export default Home;
