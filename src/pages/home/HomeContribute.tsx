import Card from "../../components/Card";
import Button from "../../components/Button";

import communityImage from "../../assets/images/hero/community-contribute.jpg";

const HomeContribute = () => {
  return (
    <section className="home__contribute m-block-5">
      <div className="container flex flex-col flex-@lg-row gap-5 p-block-4">
        <div className="home__contribute--image">
          <img
            src={communityImage}
            alt="Community Contributing"
            className="home__contribute--image--img"
          />
        </div>

        <div className="home__contribute--info">
          <div className="home__contribute--info__text">
            <h2 className="home__section--title">
              Help Us Build a Better Platform
            </h2>

            <p className="home__section--description m-block-end-4">
              As a community-driven platform, we value your expertise and
              feedback. Contribute your own practice questions, request
              corrections, or suggest improvements to help us enhance the
              learning experience for all animal science professionals.
            </p>
          </div>

          <ul className="home__contribute--info__text--card__list flex flex-col gap-3">
            <li className="home__contribute--info__text--card__list--item">
              <Card
                size="small"
                icon={{ name: "edit_document" }}
                title="Contribute Questions"
                text="Share your own practice
              questions to help expand our question bank"
              />
            </li>

            <li className="home__contribute--info__text--card__list--item">
              <Card
                size="small"
                icon={{ name: "error" }}
                title="Request Corrections"
                text="Help us maintain accuracy by reporting errors or suggesting modifications"
              />
            </li>
          </ul>

          <div className="home__contribute--info__cta m-block-start-4">
            <Button icon={{ name: "heart_plus" }}>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="clr-inherit"
              >
                Contribute Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContribute;
