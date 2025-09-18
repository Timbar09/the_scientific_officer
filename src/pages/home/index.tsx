import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";

const Home = () => {
  return (
    <main className="home main">
      <div className="container">
        <HomeHero />

        <HomeFeatures />
      </div>
    </main>
  );
};

export default Home;
