import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import PracticeFieldset from "./PracticeFieldset";
import PracticeHint from "./PracticeHint";
import PracticeTiming from "./PracticeTiming";
import PracticeType from "./PracticeType";

import type { PracticeSettings, QuestionType } from "@pages/practice/types";

import { titlize } from "@/utils";

interface PracticeQuestionsPayload {
  questions?: Array<{
    topics?: string[];
  }>;
}

const PracticeForm = () => {
  const navigate = useNavigate();
  const [practiceTopics, setPracticeTopics] = useState<string[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as PracticeQuestionsPayload;
      const topics = Array.from(
        new Set(
          data.questions?.flatMap((question) => question.topics ?? []) ?? [],
        ),
      );

      setPracticeTopics(topics);
    };

    loadTopics().catch(() => setPracticeTopics([]));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedTopics = formData.getAll("topic") as string[];
    const selectedQuestionType = formData.get(
      "questionType",
    ) as QuestionType | null;
    const includeTimer = formData.get("timePractice") === "time_practice";
    const showHint = formData.get("showHint") === "show_hints";
    const practiceDuration = Number(formData.get("practiceDuration") ?? 5);

    const settings: PracticeSettings = {
      topics:
        selectedTopics.length > 0
          ? selectedTopics
          : practiceTopics[0]
            ? [practiceTopics[0].toLowerCase() as string]
            : [],
      questionType: selectedQuestionType ?? "multiple choice",
      timePractice: includeTimer,
      practiceDuration: Number.isFinite(practiceDuration)
        ? practiceDuration
        : 5,
      showHint,
    };

    navigate("/practice/session", { state: settings });
  };

  return (
    <form
      className="practice__form m-block-start-4 p-3"
      onSubmit={handleSubmit}
    >
      <PracticeFieldset legend="Choose Topics You Want to cover:">
        <div className="practice__topic--list flex flex-wrap gap-2">
          {practiceTopics.map((topic, i) => (
            <label key={topic} className="practice__topic--item grid">
              <input
                className="custom-input"
                type="checkbox"
                name="topic"
                defaultChecked={i === 0}
                value={topic.toLowerCase()}
              />{" "}
              <span className="practice__topic--item__name custom-input__name p-block-1 p-inline-2">
                {titlize(topic)}
                {/* <span className="material-symbols-outlined practice__topic--item__icon">
                  {icon}
                </span> */}
              </span>
            </label>
          ))}
        </div>
      </PracticeFieldset>

      <PracticeType />

      <PracticeHint />

      <PracticeTiming />

      <button type="submit" className="btn btn--primary m-block-start-4">
        Start Practice
      </button>
    </form>
  );
};

export default PracticeForm;
