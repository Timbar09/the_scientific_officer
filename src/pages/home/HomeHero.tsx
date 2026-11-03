import { Link } from "react-router";

import type { HomeTranslations } from "../../context/LanguageContext";

import Button from "../../components/Button";
import Container from "../../components/Container";

import chicksImage from "../../assets/images/hero/chicks.jpg";
import kidsImage from "../../assets/images/hero/man-feeding-kids.jpg";
import vetImage from "../../assets/images/hero/vet-examining-bunny-sm.jpg";
import eggsImage from "../../assets/images/hero/woman-holding-eggs.jpg";

interface HomeHeroProps {
  data: HomeTranslations["hero"];
}

const HomeHero = ({ data }: HomeHeroProps) => {
  const { title, cta, images } = data;

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
            {title}
          </h1>

          <div className="flex jc-center ai-center jc-@md-start gap-3 flex-wrap">
            <Button icon={{ name: "neurology" }}>
              <Link to="/articles" className="clr-inherit">
                {cta.primary}
              </Link>
            </Button>

            <Button
              variant="secondary"
              icon={{ name: "menu_book", position: "left" }}
            >
              <Link to="/resources" className="clr-inherit">
                {cta.secondary}
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
