import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { FieldValues } from "react-hook-form";

import type {
  SessionSettings,
  QuestionsPayload,
  QuestionType,
} from "../pages/practice/types";

export const usePracticeSettings = () => {
  const navigate = useNavigate();
  const [practiceTopics, setPracticeTopics] = useState<string[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);

  useEffect(() => {
    loadTopics();
    loadQuestionTypes();
  }, []);

  const handleSubmit = (formValues: FieldValues) => {
    const settings = getSessionSettings(formValues);

    navigate("/practice/session", { state: settings });
  };

  const loadTopics = async () => {
    try {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as QuestionsPayload;
      const topics = Array.from(
        new Set(
          data.questions?.flatMap((question) => question.topics ?? []) ?? [],
        ),
      );

      setPracticeTopics(topics);
    } catch (error) {
      setPracticeTopics([]);
      console.error("Failed to load practice topics:", error);
    }
  };

  const loadQuestionTypes = async () => {
    try {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as QuestionsPayload;
      const types = data.questionTypes ?? [];

      setQuestionTypes(types);
    } catch (error) {
      console.error("Failed to load question types:", error);
    }
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
      timePractice: formValues.timerEnabled,
      practiceDuration: Number.isFinite(formValues.timerValue)
        ? formValues.timerValue
        : 5,
      showHint: formValues.hintsEnabled,
    };
  };

  return { practiceTopics, questionTypes, handleSubmit };
};
