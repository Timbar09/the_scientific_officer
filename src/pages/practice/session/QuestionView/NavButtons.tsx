import type { IconProps } from "../../../../components/Button";
import type { NavButtonsProps } from "../types";

import Button from "../../../../components/Button";

const NavButtons = ({
  onToggleAnswer,
  previousQuestion,
  nextQuestion,
  submit,
  setSelectedOptionId,
  showAnswer,
  questions,
  allQuestionsAnswered,
}: NavButtonsProps) => {
  const nextBtnIcon: IconProps = { name: "arrow_forward", position: "right" };
  const prevBtnIcon: IconProps = { name: "arrow_back" };

  const handleNextQuestionClick = () => {
    setSelectedOptionId(undefined);
    nextQuestion();
  };

  const handlePrevQuestionClick = () => {
    setSelectedOptionId(undefined);
    previousQuestion();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="btn btn--secondary"
        onClick={onToggleAnswer}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {questions.length > 1 ? (
        <>
          <Button onClick={handlePrevQuestionClick} icon={prevBtnIcon}>
            Prev
          </Button>

          <Button onClick={handleNextQuestionClick} icon={nextBtnIcon}>
            Next
          </Button>
        </>
      ) : null}
      {allQuestionsAnswered ? (
        <button type="button" className="btn btn--primary" onClick={submit}>
          Submit Answers
        </button>
      ) : null}
    </div>
  );
};

export default NavButtons;
