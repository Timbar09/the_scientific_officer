import { useEffect } from "react";

import type { AnswerBoxProps } from "../types";
import type {
  FormLabelData,
  FormFieldData,
  InputData,
} from "../../../../components/Form/types";

import { FormField } from "../../../../components/Form";

const AnswerBox = ({
  options = [],
  selectedAnswer,
  onSelect,
  selectedOptionId,
  setSelectedOptionId,
  correctAnswer,
  setShowAnswerButton,
  showAnswer,
}: AnswerBoxProps) => {
  const isAnswered = selectedAnswer?.length === 0 ? false : true;
  const isBinaryVariant =
    options.length === 2 &&
    options.includes("True") &&
    options.includes("False");

  useEffect(() => {
    setShowAnswerButton(isAnswered && selectedAnswer !== correctAnswer);
  }, [isAnswered, selectedAnswer, correctAnswer, setShowAnswerButton]);

  const label: FormLabelData = {
    text: "Answer Options",
    visible: false,
  };

  const data: FormFieldData[] = options.map((option, i) => {
    const isCorrect =
      isAnswered &&
      option === correctAnswer &&
      (selectedAnswer === option || showAnswer);
    const isIncorrect =
      isAnswered && selectedAnswer === option && option !== correctAnswer;

    const optionClass = isCorrect
      ? "answered__correct"
      : isIncorrect
        ? "answered__incorrect"
        : "";

    return {
      id: i,
      name: "answer",
      className: optionClass,
      value: option,
      isChecked: selectedAnswer === option,
      activeRadio: selectedAnswer === option ? i : undefined,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        onSelect(event.target.value),
    };
  });

  const typedInInput: InputData = {
    type: "textarea",
    variant: "default",
  };

  const selectedOptionInput: InputData = {
    type: "radio",
    variant: "default",
  };

  const baseCN = "practice__session--question__answerBox";
  const binaryVariantCN = isBinaryVariant ? `${baseCN}--truefalse` : "";
  const disableAnswerBoxClass = isAnswered ? `${baseCN}--disabled` : "";
  const className = `${baseCN} p-5 ${disableAnswerBoxClass}`;

  return (
    <div className={className}>
      {options.length > 0 ? (
        <FormField
          id={0}
          name="answer"
          input={selectedOptionInput}
          className={binaryVariantCN}
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

export default AnswerBox;
