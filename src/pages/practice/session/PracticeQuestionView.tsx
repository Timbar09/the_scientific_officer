import FormRadioSet from "@/components/Form/FormRadioSet";
import { FormField } from "@/components/Form";

import { titlize } from "@/utils";

import type { Session } from "@/hooks/useSession/types";
import type {
  LabelData,
  FormFieldData,
  InputData,
} from "@/components/Form/types";

type Topics = NonNullable<Session["settings"]>["topics"];

const Summary = ({ topics }: { topics: Topics }) => {
  return (
    <section
      className="practice__session--summary"
      aria-label="Topics Covered"
      title="Topics Covered"
    >
      <div className="practice__session--summary__topic">
        <h2 className="practice__session--summary__topic--title sr-only">
          Topics Covered:
        </h2>

        <div className="practice__session--summary__topic--list p-block-3 flex flex-wrap gap-2 ai-center">
          {topics.map((topic) => (
            <span key={topic} className="practice__session--summary__badge">
              {titlize(topic)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnswerBox = ({
  options = [],
  selectedAnswer,
  onSelect,
}: {
  options: string[];
  selectedAnswer: string | null;
  onSelect: (option: string) => void;
}) => {
  let isTrueFalseVariant = false;

  const label: LabelData = {
    text: "Answer Options",
    visible: false,
  };

  const data: FormFieldData[] = options.map((option, i) => {
    if (
      !isTrueFalseVariant &&
      options.length === 2 &&
      option.toLowerCase() === "true" &&
      options[1 - i].toLowerCase() === "false"
    ) {
      isTrueFalseVariant = true;
    }

    return {
      id: i,
      name: "answer",
      value: option,
      checked: selectedAnswer === option,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        onSelect(event.target.value),
    };
  });

  const trueOrFalseVariantClass = isTrueFalseVariant
    ? "practice__session--answer__options--truefalse"
    : "";

  const input: InputData = {
    type: "textarea",
    variant: "default",
  };

  return (
    <div className="practice__session--answer m-block-4">
      {options.length > 0 ? (
        <FormRadioSet
          className={trueOrFalseVariantClass}
          label={label}
          data={data}
        />
      ) : (
        <FormField
          name="answer"
          input={input}
          placeholder="Enter your answer..."
        />
      )}
    </div>
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

        <AnswerBox
          options={currentVariant.options || []}
          selectedAnswer={selectedAnswer}
          onSelect={setSelectedAnswer}
        />

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
