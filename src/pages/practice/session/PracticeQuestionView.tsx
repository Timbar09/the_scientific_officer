import { useState } from "react";

import type { IconProps } from "../../../components/Button";
import type { Session } from "../../../hooks/useSession/types";
import type { Question } from "../../../pages/practice/types";
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
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
  showAnswer: boolean;
  questions: Question[];
  allQuestionsAnswered: boolean;
}

const PracticeQuestionView = ({ session }: { session: Session }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(
    undefined,
  );
  const { settings, questions, func, revealedHintQuestionIds } = session;
  const {
    nextQuestion,
    previousQuestion,
    submit,
    setSelectedAnswer,
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

  return (
    <div className="practice__session">
      <Summary topics={settings.topics} />

      <section className="practice__session--card p-5">
        <p className="practice__session--question__label">
          Question {index + 1}/{list.length}
        </p>
        <h2 className="practice__session--question m-block-2">
          {question?.text}
        </h2>

        {settings.hintsEnabled && isHintRevealed ? (
          <div className="practice__session--hint m-block-2 flex ai-center">
            <p className="sr-only">Hint</p>

            <div className="practice__session--hint__icon flex ai-center jc-center p-1">
              <Icon name="lightbulb_2" className="practice__session--icon" />
            </div>

            <p className="practice__session--hint__message p-1">
              {question?.hint}
            </p>
          </div>
        ) : null}

        <AnswerBox
          options={question?.options || []}
          selectedAnswer={selectedAnswer}
          onSelect={setSelectedAnswer}
          selectedOptionId={selectedOptionId}
          setSelectedOptionId={setSelectedOptionId}
        />

        {current.showAnswer && (
          <div className="practice__session--answer m-block-3 p-3">
            <p>
              <strong>Correct Answer:</strong> {question?.answer}
            </p>
            <p>{question?.explanation}</p>
          </div>
        )}

        <NavButtons
          onToggleAnswer={onToggleAnswer}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          submit={submit}
          setSelectedOptionId={setSelectedOptionId}
          showAnswer={showAnswer}
          questions={list}
          allQuestionsAnswered={areAllAnswered}
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
  selectedOptionId,
  setSelectedOptionId,
}: {
  options: string[];
  selectedAnswer: string | null;
  onSelect: (option: string) => void;
  selectedOptionId: number | undefined;
  setSelectedOptionId: React.Dispatch<React.SetStateAction<number | undefined>>;
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
      isChecked: selectedAnswer === option,
      activeRadio: selectedAnswer === option ? i : undefined,
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
          activeRadio={selectedOptionId}
          setActiveRadio={setSelectedOptionId}
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
  setSelectedOptionId,
  showAnswer,
  questions,
  allQuestionsAnswered,
}: NavButtonsProps) => {
  const nextBtnIcon: IconProps = { name: "arrow_forward", position: "right" };
  const prevBtnIcon: IconProps = { name: "arrow_back" };

  const handleNextQuestionClick = () => {
    setSelectedOptionId(undefined);
    nextQuestion();
  };

  const handlePrevQuestionClick = () => {
    setSelectedOptionId(undefined);
    previousQuestion();
  };

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
          <Button onClick={handlePrevQuestionClick} icon={prevBtnIcon}>
            Prev
          </Button>

          <Button onClick={handleNextQuestionClick} icon={nextBtnIcon}>
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
