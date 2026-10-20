import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useBlocker } from "react-router";

import type { Session } from "../../../../hooks/useSession/types";
import type { Swiper as SwiperType } from "swiper";

import Header from "./Header";
import Footer from "./Footer";
import Overview from "./Overview";
import AnswerBox from "./AnswerBox";
import ConfirmLeaveModal from "./ConfirmLeaveModal";

import "swiper/css";

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const isAnswered = userAnswers.has(question?.id || "-1");
  const currentQAnsweredClass = isAnswered ? "answered" : "";

  const reset = () => {
    setSelectedOptionId(undefined);
    setHideShowAnswerButton(false);
  };

  const handleAnswerSelect = (answer: string) => {
    onSelectAnswer(answer);
  };

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      !session.isSubmitted &&
      currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      setShowConfirmation(true);
    }
  }, [blocker]);

  useEffect(() => {
    if (session.isSubmitted) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = true;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [session.isSubmitted]);

  const handleConfirmLeave = () => {
    setShowConfirmation(false);
    if (blocker.state === "blocked") {
      blocker.proceed();
    }
  };

  const handleCancelLeave = () => {
    setShowConfirmation(false);
    if (blocker.state === "blocked") {
      blocker.reset();
    }
  };

  if (!settings || !current || !list) {
    return null;
  }

  return (
    <>
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
              explanation={question?.explanation || undefined}
              onSelect={handleAnswerSelect}
              selectedOptionId={selectedOptionId}
              setSelectedOptionId={setSelectedOptionId}
              setShowAnswerButton={setHideShowAnswerButton}
              showAnswer={showAnswer}
            />

            <Footer
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

      <ConfirmLeaveModal
        isOpen={showConfirmation}
        confirmLeave={handleConfirmLeave}
        cancelLeave={handleCancelLeave}
      />
    </>
  );
};

export default PracticeQuestionView;
