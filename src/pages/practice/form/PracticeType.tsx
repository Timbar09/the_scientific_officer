import { useEffect, useState } from "react";

import { FormField } from "@/components/Form";

import type { QuestionsPayload, QuestionType } from "../types";
import type { FormFieldData, InputData } from "@/components/Form/types";

const PracticeType = () => {
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

  const mixedType = {
    id: 99,
    name: "questionType",
    value: "mixed",
    checked: false,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      console.log("Selected Question Type:", event.target.value),
  };

  const options = questionTypes
    .filter((qt) => qt.available)
    .map(({ id, name }) => ({
      id,
      name: "questionType",
      value: name.toLowerCase(),
      checked: id === 1,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        console.log("Selected Question Type:", event.target.value),
    }));

  options.push(mixedType);

  const fieldData: FormFieldData = {
    input,
    label,
    options,
  };

  return <FormField {...fieldData} />;
};

export default PracticeType;
