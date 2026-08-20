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
  displayNav,
  allQuestionsAnswered,
  hideShowAnswerButton,
  setShowAnswerButton,
}: NavButtonsProps) => {
  const nextBtnIcon: IconProps = { name: "arrow_forward", position: "right" };
  const prevBtnIcon: IconProps = { name: "arrow_back" };

  const handleNextQuestionClick = () => {
    setSelectedOptionId(undefined);
    nextQuestion();
    setShowAnswerButton(false);
  };

  const handlePrevQuestionClick = () => {
    setSelectedOptionId(undefined);
    previousQuestion();
    setShowAnswerButton(false);
  };

  return (
    <div className="flex jc-between flex-wrap gap-2">
      <div>
        {hideShowAnswerButton && (
          <Button
            variant="secondary"
            className="btn--secondary"
            onClick={onToggleAnswer}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </Button>
        )}
      </div>

      <div>
        {allQuestionsAnswered && (
          <button type="button" className="btn btn--primary" onClick={submit}>
            Submit Answers
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {displayNav && (
          <>
            <Button onClick={handlePrevQuestionClick} icon={prevBtnIcon}>
              Prev
            </Button>

            <Button onClick={handleNextQuestionClick} icon={nextBtnIcon}>
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavButtons;
