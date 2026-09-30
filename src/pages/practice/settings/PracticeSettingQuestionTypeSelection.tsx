import { useState } from "react";

import type { UseFormRegister, FieldValues } from "react-hook-form";
import type { FormFieldData } from "../../../components/Form/types";

import { FormField } from "../../../components/Form";

import type { QuestionType } from "../types";

interface QuestionTypeSelectionProps {
  register: UseFormRegister<FieldValues>;
  formSectionData: {
    name: string;
    defaultValue: string;
    questionTypes: QuestionType[];
  };
}

const PracticeSettingQuestionTypeSelection = ({
  register,
  formSectionData,
}: QuestionTypeSelectionProps) => {
  const { name, questionTypes } = formSectionData;
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);

  const label = {
    text: "Select Type of Questions",
    visible: true,
  };

  const allType = {
    id: 0,
    label: { text: "All Types", visible: true },
    value: "all-types",
  };

  const options = questionTypes
    .filter((qt) => qt.available)
    .map(({ id, slug, name }) => ({
      id,
      label: { text: name, visible: true },
      value: slug,
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
