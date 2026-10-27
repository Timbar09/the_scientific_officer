import { useNavigate } from "react-router";

import type { FieldValues } from "react-hook-form";

import type { SessionSettings } from "../pages/practice/types";
import { useAppData } from "../context/useAppData";

export const usePracticeSettings = () => {
  const navigate = useNavigate();
  const { questionBank, metrics, isDataLoading, error } = useAppData();

  const questions = questionBank?.questions ?? [];
  const questionTypes = questionBank?.questionTypes ?? [];
  const practiceTopics = Array.from(
    new Set(questions.flatMap((question) => question.topics ?? [])),
  );

  const handleSubmit = (formValues: FieldValues) => {
    const settings = getSessionSettings(formValues);

    navigate("/practice/session", { state: settings });
  };

  const getSessionSettings = (formValues: FieldValues): SessionSettings => {
    return {
      topics:
        formValues.topics.length > 0
          ? formValues.topics
          : practiceTopics[0]
            ? [practiceTopics[0].toLowerCase()]
            : [],
      questionType: formValues.questionType,
      timerEnabled: formValues.timerEnabled,
      sessionDuration: Number.isFinite(formValues.timerValue)
        ? formValues.timerValue
        : 5,
      hintsEnabled: formValues.hintsEnabled,
    };
  };

  return {
    practiceTopics,
    questionTypes,
    questions,
    metrics,
    isDataLoading,
    error,
    handleSubmit,
  };
};
