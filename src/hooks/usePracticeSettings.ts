import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { FieldValues } from "react-hook-form";

import type {
  SessionSettings,
  QuestionsPayload,
  QuestionType,
  Question,
} from "../pages/practice/types";

export const usePracticeSettings = () => {
  const navigate = useNavigate();
  const [practiceTopics, setPracticeTopics] = useState<string[]>([]);
  const [questionTypes, setQuestionTypes] = useState<QuestionType[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [metrics, setMetrics] = useState([
    {
      title: "Total Questions",
      value: 0,
    },
    {
      title: "Total Topics",
      value: 0,
    },
    {
      title: "Total Resources",
      value: 0,
    },
    {
      title: "Total Articles",
      value: 0,
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = (formValues: FieldValues) => {
    const settings = getSessionSettings(formValues);

    navigate("/practice/session", { state: settings });
  };

  const loadData = async () => {
    try {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as QuestionsPayload;
      const topics = Array.from(
        new Set(
          data.questions?.flatMap((question) => question.topics ?? []) ?? [],
        ),
      );
      const questionTypes = data.questionTypes ?? [];
      const questions = data.questions ?? [];

      setQuestions(questions);
      setPracticeTopics(topics);
      setQuestionTypes(questionTypes);
      setMetrics([
        {
          title: "Total Questions",
          value: questions.reduce((total, question) => {
            return total + Object.keys(question.variants).length;
          }, 0),
        },
        {
          title: "Total Topics",
          value: topics.length,
        },
        {
          title: "Total Resources",
          value: 1_200, // Placeholder value
        },
        {
          title: "Total Articles",
          value: 500, // Placeholder value
        },
      ]);
    } catch (error) {
      console.error("Failed to load practice data:", error);
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
      timerEnabled: formValues.timerEnabled,
      sessionDuration: Number.isFinite(formValues.timerValue)
        ? formValues.timerValue
        : 5,
      hintsEnabled: formValues.hintsEnabled,
    };
  };

  return { practiceTopics, questionTypes, questions, metrics, handleSubmit };
};
