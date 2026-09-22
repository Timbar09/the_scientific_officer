import { useNavigate } from "react-router";

import type { SessionResults, Question } from "../../types";

import Button, { type IconProps } from "../../../../components/Button";
import Summary from "./Summary";
import ReviewWrongAnswers from "./ReviewWrongAnswers";

interface Props {
  sessionResults: SessionResults;
  questions: Question[];
}

const PracticeResults = ({ sessionResults, questions }: Props) => {
  const { wrongAnswers } = sessionResults;

  return (
    <div className="practice__results grid gap-4 m-block-start-4">
      <Summary {...sessionResults} />

      <ReviewWrongAnswers wrongAnswers={wrongAnswers} questions={questions} />

      <Footer />
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  const newSessionIcon: IconProps = { name: "add" };
  const homeIcon: IconProps = { name: "home" };

  return (
    <footer className="flex flex-wrap jc-end gap-2">
      <Button onClick={() => navigate("/practice")} icon={newSessionIcon}>
        Try a New Session
      </Button>

      <Button onClick={() => navigate("/")} variant="secondary" icon={homeIcon}>
        Back to Home
      </Button>
    </footer>
  );
};

export default PracticeResults;
