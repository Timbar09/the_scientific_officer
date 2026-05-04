import type { Session } from "../../../hooks/usePracticeSession";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
};

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const {
    settings,
    currentVariant,
    currentQuestionIndex,
    filteredQuestions,
    showAnswer,
    secondsRemaining,
    selectedAnswer,
    unansweredCount,
    allQuestionsAnswered,
    nextQuestion,
    previousQuestion,
    submit,
    setSelectedAnswer,
    toggleAnswer: onToggleAnswer,
    goToPractice: onChangeSettings,
  } = session;

  if (!settings || !currentVariant) {
    return null;
  }

  return (
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
        <p className="practice__session--question__label">
          Question {currentQuestionIndex + 1}
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
              {currentVariant.options.map((option) => {
                return (
                  <li key={option}>
                    <label className="flex gap-2 p-2">
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={(event) =>
                          setSelectedAnswer(event.target.value)
                        }
                      />
                      <span>{option}</span>
                    </label>
                  </li>
                );
              })}
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
            onClick={onToggleAnswer}
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          {filteredQuestions.length > 1 ? (
            <>
              <button type="button" className="btn" onClick={previousQuestion}>
                Previous Question
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={nextQuestion}
              >
                Next Question
              </button>
            </>
          ) : null}
          {allQuestionsAnswered ? (
            <button type="button" className="btn btn--primary" onClick={submit}>
              Submit Answers
            </button>
          ) : null}
          <button type="button" className="btn" onClick={onChangeSettings}>
            Change Settings
          </button>
        </div>
      </section>
    </div>
  );
};

export default PracticeQuestionView;
