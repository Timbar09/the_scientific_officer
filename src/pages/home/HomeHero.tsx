import { Link } from "react-router";

import { useLanguage } from "../../context/useLanguage";

import Button from "../../components/Button";
import Container from "../../components/Container";

import chicksImage from "../../assets/images/hero/chicks.jpg";
import kidsImage from "../../assets/images/hero/man-feeding-kids.jpg";
import vetImage from "../../assets/images/hero/vet-examining-bunny-sm.jpg";
import eggsImage from "../../assets/images/hero/woman-holding-eggs.jpg";

const HomeHero = () => {
  const { translations, isLoading, error, t } = useLanguage();

  if (isLoading && !translations?.home) {
    return (
      <section className="home__hero main__section">
        <Container>
          <p>{t("common.loading")}...</p>
        </Container>
      </section>
    );
  }

  if (error && !translations?.home) {
    return (
      <section className="home__hero main__section">
        <Container>
          <p role="alert">Unable to load the home page: {error.message}</p>
        </Container>
      </section>
    );
  }

  if (!translations?.home) {
    return null;
  }

  const { home } = translations;
  const { hero, images } = home;

  const imageList = [
    { src: chicksImage, alt: images.image1 },
    { src: kidsImage, alt: images.image2 },
    { src: vetImage, alt: images.image3 },
    { src: eggsImage, alt: images.image4 },
  ];

  return (
    <section className="home__hero main__section">
      <Container className="flex flex-col flex-@md-row jc-@md-between ai-center gap-5">
        <div className="home__hero--text p-block-5">
          <p className="clr-primary-500">For Animal Science Professionals</p>

          <h1 className="home__title fw-bold clr-primary-900 m-block-end-4 p-block-end-2">
            {hero.title}
          </h1>

          <div className="flex jc-center ai-center jc-@md-start gap-3 flex-wrap">
            <Button icon={{ name: "neurology" }}>
              <Link to="/articles" className="clr-inherit">
                {hero.cta.primary}
              </Link>
            </Button>

            <Button
              variant="secondary"
              icon={{ name: "menu_book", position: "left" }}
            >
              <Link to="/resources" className="clr-inherit">
                {hero.cta.secondary}
              </Link>
            </Button>
          </div>
        </div>

        <div className="home__hero--image">
          <ul className="home__hero--image__list flex gap-3">
            {imageList.map((image, index) => (
              <li className="home__hero--image__item grid" key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="home__hero--image__item--img"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;
