import type { IconProps } from "../../../components/Button";
import type { Session } from "../../../hooks/useSession/types";
import type {
  FormLabelData,
  FormFieldData,
  InputData,
} from "../../../components/Form/types";

import Icon from "../../../components/Icon";
import { FormField } from "../../../components/Form";
import Button from "../../../components/Button";

import { titlize } from "../../../utils";

interface NavButtonsProps {
  onToggleAnswer: () => void;
  previousQuestion: () => void;
  nextQuestion: () => void;
  submit: () => void;
  // onChangeSettings: () => void;
  showAnswer: boolean;
  questions: Session["questions"];
  allQuestionsAnswered: boolean;
}

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const {
    settings,
    currentVariant,
    currentQuestionIndex,
    questions,
    showAnswer,
    isHintRevealed,
    selectedAnswer,
    allQuestionsAnswered,
    nextQuestion,
    previousQuestion,
    submit,
    setSelectedAnswer,
    toggleAnswer: onToggleAnswer,
    // goToPractice: onChangeSettings,
  } = session;

  if (!settings || !currentVariant || !questions) {
    return null;
  }

  return (
    <div className="practice__session">
      <Summary topics={settings.topics} />

      <section className="practice__session--card p-5">
        <p className="practice__session--question__label">
          Question {currentQuestionIndex + 1}/{questions.length}
        </p>
        <h2 className="practice__session--question m-block-2">
          {currentVariant.question}
        </h2>

        {settings.hintsEnabled && isHintRevealed && currentVariant.hint ? (
          <div className="practice__session--hint m-block-2 flex ai-center">
            <p className="sr-only">Hint</p>

            <div className="practice__session--hint__icon flex ai-center jc-center p-1">
              <Icon name="lightbulb_2" className="practice__session--icon" />
            </div>

            <p className="practice__session--hint__message p-1">
              {currentVariant.hint}
            </p>
          </div>
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

        <NavButtons
          onToggleAnswer={onToggleAnswer}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          submit={submit}
          // onChangeSettings={onChangeSettings}
          showAnswer={showAnswer}
          questions={questions}
          allQuestionsAnswered={allQuestionsAnswered}
        />
      </section>
    </div>
  );
};

const Summary = ({ topics }: { topics: string[] }) => {
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

  const label: FormLabelData = {
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

  const typedInInput: InputData = {
    type: "textarea",
    variant: "default",
  };

  const selectedOptionInput: InputData = {
    type: "radio",
    variant: "default",
  };

  return (
    <div className="practice__session--answer m-block-4">
      {options.length > 0 ? (
        <FormField
          id={0}
          name="answer"
          input={selectedOptionInput}
          className={trueOrFalseVariantClass}
          label={label}
          options={data}
        />
      ) : (
        <FormField
          id={0}
          name="answer"
          input={typedInInput}
          placeholder="Enter your answer..."
        />
      )}
    </div>
  );
};

const NavButtons = ({
  onToggleAnswer,
  previousQuestion,
  nextQuestion,
  submit,
  // onChangeSettings,
  showAnswer,
  questions,
  allQuestionsAnswered,
}: NavButtonsProps) => {
  const nextBtnIcon: IconProps = { name: "arrow_forward", position: "right" };
  const prevBtnIcon: IconProps = { name: "arrow_back" };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="btn btn--secondary"
        onClick={onToggleAnswer}
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </button>
      {questions.length > 1 ? (
        <>
          <Button onClick={previousQuestion} icon={prevBtnIcon}>
            Prev
          </Button>

          <Button onClick={nextQuestion} icon={nextBtnIcon}>
            Next
          </Button>
        </>
      ) : null}
      {allQuestionsAnswered ? (
        <button type="button" className="btn btn--primary" onClick={submit}>
          Submit Answers
        </button>
      ) : null}
    </div>
  );
};

export default PracticeQuestionView;
