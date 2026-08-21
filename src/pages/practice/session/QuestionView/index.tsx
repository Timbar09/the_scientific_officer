import { useRef, useState } from "react";

import type { Session } from "../../../../hooks/useSession/types";

import Summary from "./Summary";
import Overview from "./Overview";
import InfoCard from "./InfoCard";
import AnswerBox from "./AnswerBox";
import NavButtons from "./NavButtons";

import "swiper/css";

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const questionRef = useRef<HTMLElement>(null);
  const [hideShowAnswerButton, setHideShowAnswerButton] = useState(false);
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
    setCurrentQuestionIndex,
    toggleAnswer: onToggleAnswer,
  } = func;
  const { list, current, areAllAnswered } = questions;
  const { index, question, selectedAnswer, showAnswer } = current;

  const isHintRevealed = question
    ? revealedHintQuestionIds.has(question.id)
    : false;

  if (!settings || !current || !list) {
    return null;
  }

  const handleAnswerSelect = (answer: string) => {
    onSelectAnswer(answer);

    if (questionRef.current) {
      questionRef.current.classList.add("answered");
    }
  };

  return (
    <div className="practice__session">
      <Summary topics={settings.topics} />

      <Overview
        questions={list}
        userAnswers={userAnswers}
        questionNum={index}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />

      <section className="practice__session--question p-5" ref={questionRef}>
        <p className="practice__session--question__label">
          Question {index + 1}/{list.length}
        </p>

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
          onToggleAnswer={onToggleAnswer}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          submit={submit}
          setSelectedOptionId={setSelectedOptionId}
          showAnswer={showAnswer}
          displayNav={list.length > 1}
          allQuestionsAnswered={areAllAnswered}
          hideShowAnswerButton={hideShowAnswerButton}
          setShowAnswerButton={setHideShowAnswerButton}
        />
      </section>
    </div>
  );
};

export default PracticeQuestionView;
