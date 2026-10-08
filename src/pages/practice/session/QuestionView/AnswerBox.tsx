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
  explanation,
}: AnswerBoxProps) => {
  const baseCN = "practice__session--question__answerBox";

  const isAnswered = selectedAnswer?.length === 0 ? false : true;

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
      className: `${baseCN}--option ${optionClass}`,
      value: option,
      isChecked: selectedAnswer === option,
      optionCorrectText: isCorrect ? explanation : undefined,
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

  const disableAnswerBoxClass = isAnswered ? `${baseCN}--disabled` : "";
  const className = `${baseCN} p-5 ${disableAnswerBoxClass}`;

  return (
    <div className={className}>
      {options.length > 0 ? (
        <FormField
          id={0}
          name="answer"
          input={selectedOptionInput}
          label={label}
          options={data}
          numberOptions={true}
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
