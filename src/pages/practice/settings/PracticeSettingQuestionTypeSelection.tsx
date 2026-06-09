import { useEffect, useState } from "react";

import { FormField } from "../../../components/Form";

import type { QuestionsPayload, QuestionType } from "../types";
import type { FormFieldData, InputData } from "../../../components/Form/types";

import { DEFAULT_ACTIVE_RADIO } from "../../../components/Form/FormRadioButton";

interface PracticeSettingQuestionTypeSelectionProps {
  selectedQuestionType: string;
  onQuestionTypeChange: (value: string) => void;
}

const PracticeSettingQuestionTypeSelection = ({
  selectedQuestionType,
  onQuestionTypeChange,
}: PracticeSettingQuestionTypeSelectionProps) => {
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);

  useEffect(() => {
    const loadQuestionTypes = async () => {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as QuestionsPayload;
      const types = data.questionTypes ?? [];

      setQuestionTypes(types);
    };

    loadQuestionTypes().catch(() => setQuestionTypes([]));
  }, []);

  const input: InputData = { type: "radio", variant: "rail" };

  const label = {
    text: "Select Type of Questions",
    visible: true,
  };

  const allType = {
    id: DEFAULT_ACTIVE_RADIO,
    name: "questionType",
    value: "all",
    checked: selectedQuestionType === "all",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      onQuestionTypeChange(event.target.value),
  };

  const options = questionTypes
    .filter((qt) => qt.available)
    .map(({ id, name }) => ({
      id,
      name: "questionType",
      value: name.toLowerCase(),
      checked: selectedQuestionType === name.toLowerCase(),
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        onQuestionTypeChange(event.target.value),
    }));

  options.unshift(allType);

  const fieldData: FormFieldData = {
    input,
    label,
    options,
  };

  return <FormField {...fieldData} />;
};

export default PracticeSettingQuestionTypeSelection;
