import { useState } from "react";

import type { UseFormRegister, FieldValues } from "react-hook-form";
import type { FormFieldData } from "../../../components/Form/types";

import { FormField } from "../../../components/Form";

interface QuestionTypeSelectionProps {
  register: UseFormRegister<FieldValues>;
  formSectionData: {
    name: string;
    defaultValue: string;
    questionTypes: { id: number; name: string; available: boolean }[];
  };
}

const PracticeSettingQuestionTypeSelection = ({
  register,
  formSectionData,
}: QuestionTypeSelectionProps) => {
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);
  const { name, defaultValue, questionTypes } = formSectionData;

  const label = {
    text: "Select Type of Questions",
    visible: true,
  };

  const allType = {
    id: 0,
    value: "all",
    isChecked: defaultValue === "all",
  };

  const options = questionTypes
    .filter((qt) => qt.available)
    .map(({ id, name }) => ({
      id,
      value: name.toLowerCase(),
      isChecked: false,
    }));

  options.unshift(allType);

  const fieldData: FormFieldData = {
    id: 1,
    name: name,
    input: { type: "radio", variant: "rail" },
    label,
    register,
    activeRadio: selectedTypeId,
    setActiveRadio: setSelectedTypeId,
    options,
  };

  return <FormField {...fieldData} />;
};

export default PracticeSettingQuestionTypeSelection;
