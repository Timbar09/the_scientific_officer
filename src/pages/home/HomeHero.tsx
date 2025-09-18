import { Link } from "react-router";

import Button from "../../components/Button";

import chicksImage from "../../assets/images/hero/chicks.jpg";
import kidsImage from "../../assets/images/hero/man-feeding-kids.jpg";
import vetImage from "../../assets/images/hero/vet-examining-bunny-sm.jpg";
import eggsImage from "../../assets/images/hero/woman-holding-eggs.jpg";

const HomeHero = () => {
  const images = [
    { src: chicksImage, alt: "Chicks" },
    { src: kidsImage, alt: "Kids" },
    { src: vetImage, alt: "Vet Examining Bunny" },
    { src: eggsImage, alt: "Woman Holding Eggs" },
  ];

  return (
    <section className="home__hero main__section flex flex-col flex-@md-row jc-@md-between ai-center gap-5">
      <div className="home__hero--text flex flex-col jc-center ai-center ai-@md-start gap-4 p-block-5">
        <h1 className="home__title fw-bold clr-primary-900">
          Ace the Scientific Officer Role
        </h1>

        <Button>
          <Link to="/articles" className="clr-inherit">
            Explore Articles
          </Link>
        </Button>
      </div>

      <div className="home__hero--image">
        <ul className="home__hero--image__list flex gap-3">
          {images.map((image, index) => (
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
    </section>
  );
};

export default HomeHero;
