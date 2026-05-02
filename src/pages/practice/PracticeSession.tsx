import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import type { PracticeQuestion, PracticeSettings } from "./types";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const PracticeSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const settings = location.state as PracticeSettings | undefined;

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!settings) {
      navigate("/practice", { replace: true });
      return;
    }

    const loadQuestions = async () => {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as PracticeQuestion[];
      setQuestions(data);
      setLoading(false);
    };

    loadQuestions().catch(() => setLoading(false));
  }, [navigate, settings]);

  useEffect(() => {
    if (settings?.timePractice) {
      setSecondsRemaining(settings.practiceDuration * 60);
    }
  }, [settings]);

  useEffect(() => {
    if (!settings?.timePractice) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsRemaining((currentSeconds) => Math.max(currentSeconds - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [settings?.timePractice]);

  const filteredQuestions = useMemo(() => {
    if (!settings) {
      return [];
    }

    return questions.filter(
      (question) =>
        settings.topics.includes(question.topic) &&
        Boolean(question.variants[settings.questionType]),
    );
  }, [questions, settings]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [filteredQuestions.length]);

  if (!settings || loading) {
    return (
      <div className="practice page">
        <div className="container">
          <h1 className="page__title">Loading your practice session…</h1>
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="practice page">
        <div className="container">
          <h1 className="page__title">No Questions Found</h1>
          <p className="page__description">
            There are no questions in the JSON bank for the selected topics and
            question type yet.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => navigate("/practice")}
          >
            Back to Practice Setup
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = filteredQuestions[currentQuestionIndex]!;
  const currentVariant = currentQuestion.variants[settings.questionType]!;

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestionIndex(
      (currentIndex) => (currentIndex + 1) % filteredQuestions.length,
    );
  };

  return (
    <div className="practice page">
      <div className="container">
        <h1 className="page__title">Practice Session</h1>

        <div className="practice__session grid gap-4 m-block-start-4">
          <section className="practice__session--summary p-3">
            <p>
              <strong>Topics:</strong> {settings.topics.join(", ")}
            </p>
            <p>
              <strong>Question Type:</strong> {settings.questionType}
            </p>
            <p>
              <strong>Hints:</strong> {settings.showHint ? "On" : "Off"}
            </p>
            <p>
              <strong>Timing:</strong>{" "}
              {settings.timePractice
                ? `On (${formatTime(secondsRemaining)})`
                : "Off"}
            </p>
            <p>
              <strong>Question:</strong> {currentQuestionIndex + 1} of{" "}
              {filteredQuestions.length}
            </p>
          </section>

          <section className="practice__session--card p-3">
            <p className="practice__session--topic text-uppercase">
              {currentQuestion.topic}
            </p>
            <h2 className="practice__session--question m-block-2">
              {currentVariant.question}
            </h2>

            {settings.showHint && currentVariant.hint ? (
              <p className="practice__session--hint m-block-2">
                <strong>Hint:</strong> {currentVariant.hint}
              </p>
            ) : null}

            {currentVariant.options ? (
              <ul className="practice__session--options grid gap-2 m-block-3">
                {currentVariant.options.map((option) => (
                  <li key={option} className="practice__session--option p-2">
                    {option}
                  </li>
                ))}
              </ul>
            ) : null}

            {showAnswer ? (
              <div className="practice__session--answer m-block-3 p-3">
                <p>
                  <strong>Answer:</strong> {currentVariant.answer}
                </p>
                <p>{currentVariant.explanation}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setShowAnswer(true)}
              >
                Show Answer
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/practice")}
              >
                Change Settings
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PracticeSession;
