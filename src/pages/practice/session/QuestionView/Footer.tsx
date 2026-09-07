import InfoCard from "./InfoCard";

import type { IconProps } from "../../../../components/Button";
import type { NavButtonsProps } from "../types";

import Button from "../../../../components/Button";

const Footer = ({
  toggleAnswer,
  previousQuestion,
  nextQuestion,
  submit,
  showAnswer,
  displayNav,
  allQuestionsAnswered,
  hideShowAnswerButton,
  reset,
  answerExplanation,
  swiperInstance,
}: NavButtonsProps) => {
  const nextBtnIcon: IconProps = { name: "arrow_forward", position: "right" };
  const prevBtnIcon: IconProps = { name: "arrow_back" };

  const navButtonVariant = allQuestionsAnswered ? "tertiary" : "primary";

  const handleNextQuestionClick = () => {
    reset();
    nextQuestion();

    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrevQuestionClick = () => {
    reset();
    previousQuestion();

    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  return (
    <footer className="practice__session--question__footer p-5">
      <InfoCard
        display={hideShowAnswerButton && showAnswer}
        classPrefix="explanation"
        icon="info"
        text={answerExplanation}
      />

      <div className="flex jc-between flex-wrap gap-2">
        <div>
          {hideShowAnswerButton && (
            <Button
              variant="secondary"
              className="btn--secondary"
              onClick={toggleAnswer}
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </Button>
          )}
        </div>

        <div>
          {allQuestionsAnswered && (
            <Button onClick={submit}>Submit Answers</Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {displayNav && (
            <>
              <Button
                variant={navButtonVariant}
                onClick={handlePrevQuestionClick}
                icon={prevBtnIcon}
              >
                Prev
              </Button>

              <Button
                variant={navButtonVariant}
                onClick={handleNextQuestionClick}
                icon={nextBtnIcon}
              >
                Next
              </Button>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
