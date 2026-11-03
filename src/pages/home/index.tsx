import { useLanguage } from "../../context/useLanguage";

import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";
import HomeMetrics from "./HomeMetrics";
import HomePractice from "./HomePractice";
import HomeContribute from "./HomeContribute";
import Container from "../../components/Container";

const Home = () => {
  const { translations } = useLanguage();

  if (!translations) {
    return (
      <Container>
        <p>Home page translations are not available.</p>
      </Container>
    );
  }

  const { home } = translations;
  const { hero } = home;

  return (
    <main className="home main">
      <HomeHero data={hero} />

      <HomeFeatures />

      <HomeMetrics />

      <HomePractice />

      <HomeContribute />
    </main>
  );
};

export default Home;
