import { useLayoutEffect, useRef, useState } from "react";

import type { Session } from "../../../../hooks/useSession/types";
import type { Swiper as SwiperType } from "swiper";

import Header from "./Header";
// import Topics from "./Topics";
import Overview from "./Overview";
// import InfoCard from "./InfoCard";
import AnswerBox from "./AnswerBox";
import NavButtons from "./NavButtons";

import "swiper/css";

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const questionRef = useRef<HTMLElement>(null);
  const [isQuestionCardMounted, setIsQuestionCardMounted] = useState(false);
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

  useLayoutEffect(() => {
    setIsQuestionCardMounted(Boolean(questionRef.current));
  }, [current, list]);

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
        {isQuestionCardMounted && (
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
        )}

        <section
          className={`practice__session--question ${currentQAnsweredClass}`}
          ref={questionRef}
        >
          <Header
            questionNumber={index + 1}
            questionCount={list.length}
            topicList={settings.topics}
            questionText={question?.text || ""}
            displayHint={isHintRevealed && settings.hintsEnabled}
            hintText={question?.hint || ""}
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

          <NavButtons
            toggleAnswer={toggleAnswer}
            previousQuestion={previousQuestion}
            nextQuestion={nextQuestion}
            submit={submit}
            displayNav={list.length > 1}
            allQuestionsAnswered={areAllAnswered}
            showAnswer={showAnswer}
            hideShowAnswerButton={hideShowAnswerButton}
            answerExplanation={question?.explanation || ""}
            reset={reset}
            swiperInstance={swiperInstance}
          />
        </section>
      </div>
    </div>
  );
};

export default PracticeQuestionView;
