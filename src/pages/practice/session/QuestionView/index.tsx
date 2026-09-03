import { useRef, useState } from "react";

import type { Session } from "../../../../hooks/useSession/types";
import type { Swiper as SwiperType } from "swiper";

import Topics from "./Topics";
import Overview from "./Overview";
import InfoCard from "./InfoCard";
import AnswerBox from "./AnswerBox";
import NavButtons from "./NavButtons";

import "swiper/css";

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const questionRef = useRef<HTMLElement>(null);
  const [hideShowAnswerButton, setHideShowAnswerButton] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
    undefined,
  );
  const { settings, questions, func, revealedHintQuestionIds, userAnswers } =
    session;
  const {
    onSelectAnswer,
    nextQuestion,
    previousQuestion,
    submit,
    jumpToQuestion,
    toggleAnswer,
  } = func;
  const { list, current, areAllAnswered } = questions;
  const { index, question, selectedAnswer, showAnswer } = current;

  const isHintRevealed = question
    ? revealedHintQuestionIds.has(question.id)
    : false;

  if (!settings || !current || !list) {
    return null;
  }

  const isAnswered = userAnswers.has(question?.id || -1);
  const currentQAnsweredClass = isAnswered ? "answered" : "";

  const reset = () => {
    setSelectedOptionId(undefined);
    setHideShowAnswerButton(false);
  };

  const handleAnswerSelect = (answer: string) => {
    onSelectAnswer(answer);
  };

  return (
    <div className="practice__session">
      <h2 className="sr-only">Practice Session</h2>

      <div className="practice__session--content flex flex-col flex-@lg-row ai-start gap-3 gap-@lg-4">
        <Overview
          questions={list}
          userAnswers={userAnswers}
          questionNum={index}
          jumpToQuestion={jumpToQuestion}
          questionCardRef={questionRef as React.RefObject<HTMLElement>}
          swiperInstance={swiperInstance}
          setSwiperInstance={setSwiperInstance}
          reset={reset}
        />

        <section
          className={`practice__session--question p-5 ${currentQAnsweredClass}`}
          ref={questionRef}
        >
          <div className="flex gap-2 ai-center">
            <p className="practice__session--question__label">
              Question {index + 1} of {list.length}
            </p>

            <Topics list={settings.topics} />
          </div>

          <h2 className="practice__session--question__text m-block-2">
            {question?.text}
          </h2>

          <InfoCard
            display={isHintRevealed && settings.hintsEnabled}
            classPrefix="hint"
            icon="lightbulb_2"
            text={question?.hint || ""}
          />

          <AnswerBox
            options={question?.options || []}
            selectedAnswer={selectedAnswer}
            correctAnswer={question?.answer || ""}
            onSelect={handleAnswerSelect}
            selectedOptionId={selectedOptionId}
            setSelectedOptionId={setSelectedOptionId}
            setShowAnswerButton={setHideShowAnswerButton}
            showAnswer={showAnswer}
          />

          {current.showAnswer && (
            <InfoCard
              display={current.showAnswer && question?.explanation !== ""}
              classPrefix="explanation"
              icon="info"
              text={question?.explanation || ""}
            />
          )}

          <NavButtons
            toggleAnswer={toggleAnswer}
            previousQuestion={previousQuestion}
            nextQuestion={nextQuestion}
            submit={submit}
            showAnswer={showAnswer}
            displayNav={list.length > 1}
            allQuestionsAnswered={areAllAnswered}
            hideShowAnswerButton={hideShowAnswerButton}
            reset={reset}
            swiperInstance={swiperInstance}
          />
        </section>
      </div>
    </div>
  );
};

export default PracticeQuestionView;
