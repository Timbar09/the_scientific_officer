import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import type {
  PracticeData,
  PracticeQuestion,
  PracticeSettings,
  SessionResults,
  UserAnswer,
} from "./types";

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
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer>>(
    new Map(),
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionResults, setSessionResults] = useState<SessionResults | null>(
    null,
  );

  useEffect(() => {
    if (!settings) {
      navigate("/practice", { replace: true });
      return;
    }

    const loadQuestions = async () => {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as PracticeData;
      const { questions } = data;
      setQuestions(questions);
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
        question.topics.some((topic) => settings.topics.includes(topic)) &&
        Boolean(question.variants[settings.questionType]),
    );
  }, [questions, settings]);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [filteredQuestions.length]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const currentVariant =
    currentQuestion?.variants[settings?.questionType ?? "multiple choice"];

  const answersWithCurrentSelection = useMemo(() => {
    const updatedAnswers = new Map(userAnswers);

    if (currentQuestion && currentVariant && selectedAnswer) {
      updatedAnswers.set(currentQuestion.id, {
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: selectedAnswer === currentVariant.answer,
        correctAnswer: currentVariant.answer,
      });
    }

    return updatedAnswers;
  }, [currentQuestion, currentVariant, selectedAnswer, userAnswers]);

  const unansweredQuestionIndexes = useMemo(
    () =>
      filteredQuestions
        .map((question, index) =>
          answersWithCurrentSelection.has(question.id) ? -1 : index,
        )
        .filter((index) => index !== -1),
    [answersWithCurrentSelection, filteredQuestions],
  );

  const unansweredCount = unansweredQuestionIndexes.length;
  const allQuestionsAnswered = unansweredCount === 0;

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
            There are no questions in the database(JSON bank) for the selected
            topics and question type yet.
          </p>

          <p>
            You can either go back and select different topics/question types,
            or you can contribute to our question bank by submitting your own
            questions{" "}
            <a
              href="https://example.com/contribute"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
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

  if (!currentQuestion || !currentVariant) {
    return null;
  }

  const handleNextQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);

    setShowAnswer(false);
    setSelectedAnswer("");

    if (
      currentQuestionIndex === filteredQuestions.length - 1 &&
      unansweredQuestionIndexes.length > 0
    ) {
      setCurrentQuestionIndex(unansweredQuestionIndexes[0]);
      return;
    }

    setCurrentQuestionIndex(
      (currentIndex) => (currentIndex + 1) % filteredQuestions.length,
    );
  };

  const handlePreviousQuestion = () => {
    setUserAnswers(answersWithCurrentSelection);

    setShowAnswer(false);
    setSelectedAnswer("");
    setCurrentQuestionIndex(
      (currentIndex) =>
        (currentIndex - 1 + filteredQuestions.length) %
        filteredQuestions.length,
    );
  };

  const handleSubmit = () => {
    setUserAnswers(answersWithCurrentSelection);

    const correctCount = Array.from(
      answersWithCurrentSelection.values(),
    ).filter((answer) => answer.isCorrect).length;
    const wrongAnswers = Array.from(
      answersWithCurrentSelection.values(),
    ).filter((answer) => !answer.isCorrect);
    const score = Math.round((correctCount / filteredQuestions.length) * 100);

    const results: SessionResults = {
      totalQuestions: filteredQuestions.length,
      correctAnswers: correctCount,
      wrongAnswers,
      score,
    };

    setSessionResults(results);
    setSessionComplete(true);
  };

  return (
    <div className="practice page">
      <div className="container">
        <h1 className="page__title">
          {sessionComplete ? "Practice Results" : "Practice Session"}
        </h1>

        {!sessionComplete ? (
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
                <strong>Unanswered:</strong> {unansweredCount}
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
                {currentQuestion.topics.join(", ")}
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
                <fieldset className="practice__session--answer-selection m-block-3">
                  <legend className="sr-only">Select your answer</legend>
                  <ul className="grid gap-2">
                    {currentVariant.options.map((option) => (
                      <li key={option}>
                        <label className="flex gap-2 p-2">
                          <input
                            type="radio"
                            name="answer"
                            value={option}
                            checked={selectedAnswer === option}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                          />
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </fieldset>
              ) : null}

              {showAnswer && (
                <div className="practice__session--answer m-block-3 p-3">
                  <p>
                    <strong>Correct Answer:</strong> {currentVariant.answer}
                  </p>
                  <p>{currentVariant.explanation}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={() => setShowAnswer(!showAnswer)}
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
                {filteredQuestions.length > 1 ? (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={handlePreviousQuestion}
                    >
                      Previous Question
                    </button>
                    <button
                      type="button"
                      className="btn btn--primary"
                      onClick={handleNextQuestion}
                    >
                      Next Question
                    </button>
                  </>
                ) : null}
                {allQuestionsAnswered ? (
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={handleSubmit}
                  >
                    Submit Answers
                  </button>
                ) : null}
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
        ) : sessionResults ? (
          <div className="practice__results grid gap-4 m-block-start-4">
            <section className="practice__results--summary p-3">
              <h2 className="text-3xl m-block-end-2">
                Final Score: {sessionResults.score}%
              </h2>
              <p className="text-lg">
                <strong>Correct Answers:</strong>{" "}
                {sessionResults.correctAnswers} of{" "}
                {sessionResults.totalQuestions}
              </p>
              <p className="text-lg">
                <strong>Wrong Answers:</strong>{" "}
                {sessionResults.wrongAnswers.length}
              </p>
            </section>

            {sessionResults.wrongAnswers.length > 0 ? (
              <section className="practice__results--wrong-answers p-3">
                <h3 className="text-xl m-block-end-2">Review Wrong Answers:</h3>
                <ul className="grid gap-3">
                  {sessionResults.wrongAnswers.map((wrongAnswer) => {
                    const question = filteredQuestions.find(
                      (q) => q.id === wrongAnswer.questionId,
                    );
                    const variant = question?.variants[settings.questionType];
                    return (
                      <li
                        key={wrongAnswer.questionId}
                        className="p-3"
                        style={{ border: "1px solid #ddd" }}
                      >
                        <p>
                          <strong>Question:</strong> {variant?.question}
                        </p>
                        <p>
                          <strong>Your Answer:</strong>{" "}
                          {wrongAnswer.selectedAnswer}
                        </p>
                        <p>
                          <strong>Correct Answer:</strong>{" "}
                          {wrongAnswer.correctAnswer}
                        </p>
                        <p>
                          <strong>Explanation:</strong> {variant?.explanation}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : (
              <section className="practice__results--perfect p-3">
                <h3 className="text-xl">Perfect Score! 🎉</h3>
                <p>You got all questions correct!</p>
              </section>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => navigate("/practice")}
              >
                Try Another Session
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PracticeSession;
