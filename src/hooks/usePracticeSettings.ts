import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import type {
  SessionSettings,
  QuestionTypeName,
  QuestionsPayload,
} from "@pages/practice/types";

export const usePracticeSettings = () => {
  const navigate = useNavigate();
  const [practiceTopics, setPracticeTopics] = useState<string[]>([]);

  useEffect(() => {
    loadTopics();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const settings = getSessionSettings(event);

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

  const getFormData = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    return {
      selectedTopics: formData.getAll("topic") as string[],
      selectedQuestionType: formData.get(
        "questionType",
      ) as QuestionTypeName | null,
      includeTimer: formData.get("sessionTimer") === "set_timer",
      showHint: formData.get("showHints") === "show_hints",
      practiceDuration: Number(formData.get("practiceDuration") ?? 5),
    };
  };

  const getSessionSettings = (
    event: FormEvent<HTMLFormElement>,
  ): SessionSettings => {
    const data = getFormData(event);

    return {
      topics:
        data.selectedTopics.length > 0
          ? data.selectedTopics
          : practiceTopics[0]
            ? [practiceTopics[0].toLowerCase() as string]
            : [],
      questionType: data.selectedQuestionType ?? "Multiple Choice",
      timePractice: data.includeTimer,
      practiceDuration: Number.isFinite(data.practiceDuration)
        ? data.practiceDuration
        : 5,
      showHint: data.showHint,
    };
  };

  return { practiceTopics, handleSubmit };
};
