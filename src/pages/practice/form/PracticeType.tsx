import { useEffect, useState } from "react";

import { FormRadioSet } from "@/components/Form";

import type { QuestionsPayload, QuestionType } from "../types";

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

  const data = questionTypes
    .filter((type) => type.available)
    .map(({ id, name }) => ({
      id,
      name: "questionType",
      value: name.toLowerCase(),
      checked: id === 1,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        console.log("Selected Question Type:", event.target.value),
    }));

  data.push(mixedType);

  return <FormRadioSet label={label} variant="rail" data={data} />;
};

export default PracticeType;
