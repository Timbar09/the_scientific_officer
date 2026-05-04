import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import PracticeFieldset from "./PracticeFieldset";
import PracticeHint from "./PracticeHint";
import PracticeTiming from "./PracticeTiming";
import PracticeType from "./PracticeType";

import { processControlledTopics, type ProcessedTopic } from "@/utils";
import type {
  PracticeSettings,
  PracticeTopic,
  QuestionType,
} from "@pages/practice/types";

interface PracticeQuestionsMeta {
  controlledTopics?: string[];
}

interface PracticeQuestionsPayload {
  meta?: PracticeQuestionsMeta;
}

const PracticeForm = () => {
  const navigate = useNavigate();
  const [practiceTopics, setPracticeTopics] = useState<ProcessedTopic[]>([]);

  useEffect(() => {
    const loadTopics = async () => {
      const response = await fetch("/practice-questions.json");
      const data = (await response.json()) as PracticeQuestionsPayload;
      const controlledTopics = data.meta?.controlledTopics ?? [];

      setPracticeTopics(processControlledTopics(controlledTopics));
    };

    loadTopics().catch(() => setPracticeTopics([]));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedTopics = formData.getAll("topic") as PracticeTopic[];
    const questionType = formData.get("questionType") as QuestionType | null;
    const timePractice = formData.get("timePractice") === "time_practice";
    const showHint = formData.get("showHint") === "show_hints";
    const practiceDuration = Number(formData.get("practiceDuration") ?? 5);

    const settings: PracticeSettings = {
      topics:
        selectedTopics.length > 0
          ? selectedTopics
          : practiceTopics[0]
            ? [practiceTopics[0].value as PracticeTopic]
            : [],
      questionType: questionType ?? "multiple choice",
      timePractice,
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
          {practiceTopics.map(({ id, label, icon, value }) => (
            <label key={id} className="practice__topic--item grid">
              <input
                className="custom-input"
                type="checkbox"
                name="topic"
                defaultChecked={id === 1}
                value={value}
              />{" "}
              <span className="practice__topic--item__name custom-input__name p-block-2 p-inline-4">
                {label}
                <span className="material-symbols-outlined practice__topic--item__icon">
                  {icon}
                </span>
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
