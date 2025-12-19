import Button from "../../components/Button";
import { Link } from "react-router";

const HomePractice = () => {
  return (
    <section className="home__practice m-block-5">
      <div className="container p-block-4 text-center">
        <h2 className="home__section--title">
          Ready to Enhance Your Animal Science Skills?
        </h2>

        <p className="home__section--description m-block-end-4">
          Dive into our extensive practice questions and resources tailored for
          scientific officers. Start your journey towards mastery today!
        </p>

        <div className="flex jc-center jc-@md-start">
          <Button>
            <Link to="/practice" className="clr-inherit">
              Get Started Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePractice;
