import { titlize } from "@/utils";

import type { Session } from "../../../hooks/usePracticeSession";

type Topics = NonNullable<Session["settings"]>["topics"];

const Summary = ({ topics }: { topics: Topics }) => {
  return (
    <section
      className="practice__session--summary p-block-3 flex gap-2 ai-center"
      aria-label="Topics Covered"
      title="Topics Covered"
    >
      <h2 className="practice__session--summary__title sr-only">
        Topics Covered:
      </h2>
      {topics.map((topic) => (
        <span key={topic} className="practice__session--summary__badge">
          {titlize(topic)}
        </span>
      ))}
    </section>
  );
};

const AnswerOptions = ({
  options,
  selectedAnswer,
  onSelect,
}: {
  options: string[];
  selectedAnswer: string | null;
  onSelect: (option: string) => void;
}) => {
  return (
    <fieldset className="practice__session--answer-selection m-block-3">
      <legend className="sr-only">Select your answer</legend>
      <ul className="grid gap-2">
        {options.map((option) => {
          return (
            <li key={option}>
              <label className="flex gap-2 p-2">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(event) => onSelect(event.target.value)}
                />
                <span>{option}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const {
    settings,
    currentVariant,
    currentQuestionIndex,
    filteredQuestions,
    showAnswer,
    isHintRevealed,
    selectedAnswer,
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
    <div className="practice__session">
      <Summary topics={settings.topics} />

      <section className="practice__session--card p-5">
        <p className="practice__session--question__label">
          Question {currentQuestionIndex + 1}/{filteredQuestions.length}
        </p>
        <h2 className="practice__session--question m-block-2">
          {currentVariant.question}
        </h2>

        {settings.showHint && isHintRevealed && currentVariant.hint ? (
          <p className="practice__session--hint m-block-2">
            <strong>Hint:</strong> {currentVariant.hint}
          </p>
        ) : null}

        {currentVariant.options ? (
          <AnswerOptions
            options={currentVariant.options}
            selectedAnswer={selectedAnswer}
            onSelect={setSelectedAnswer}
          />
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
