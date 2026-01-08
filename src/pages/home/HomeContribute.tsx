import communityImage from "../../assets/images/hero/community-contribute.jpg";

const HomeContribute = () => {
  return (
    <section className="home__contribute m-block-5">
      <div className="container flex flex-col flex-@md-row gap-5 p-block-4">
        <div className="home__contribute--image">
          <img
            src={communityImage}
            alt="Community Contributing"
            className="home__contribute--image--img"
          />
        </div>

        <div className="home__contribute--text">
          <h2 className="home__section--title">
            Help Us Build a Better Platform
          </h2>

          <p className="home__section--description m-block-end-4">
            As a community-driven platform, we value your expertise and
            feedback. Contribute your own practice questions, request
            corrections, or suggest improvements to help us enhance the learning
            experience for all animal science professionals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeContribute;
