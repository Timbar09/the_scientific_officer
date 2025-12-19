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
    <section className="home__hero main__section">
      <div className="container flex flex-col flex-@md-row jc-@md-between ai-center gap-5">
        <div className="home__hero--text p-block-5">
          <p className="clr-primary-500">For Animal Science Professionals</p>

          <h1 className="home__title fw-bold clr-primary-900 m-block-end-4 p-block-end-2">
            <span>Master</span> <span>Animal Science</span>{" "}
            <span>Through Practice</span>
          </h1>

          <div className="flex jc-center jc-@md-start gap-3">
            <Button>
              <Link to="/articles" className="clr-inherit">
                Start Practicing
              </Link>
            </Button>

            <Button variant="secondary">
              <Link to="/resources" className="clr-inherit">
                Browse Resources
              </Link>
            </Button>
          </div>
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
      </div>
    </section>
  );
};

export default HomeHero;
