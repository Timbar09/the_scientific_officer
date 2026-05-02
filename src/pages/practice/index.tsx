import type { FormEvent } from "react";
import { useNavigate } from "react-router";

import PracticeFieldset from "./PracticeFieldset";
import PracticeType from "./PracticeType";
import PracticeTiming from "./PracticeTiming";
import type { PracticeSettings, PracticeTopic, QuestionType } from "./types";

const Practice = () => {
  const navigate = useNavigate();

  const topics = [
    {
      id: 1,
      label: "Animal Health",
      icon: "cardiology",
      value: "animal health",
    },
    {
      id: 2,
      label: "Animal Nutrition",
      icon: "nutrition",
      value: "animal nutrition",
    },
    {
      id: 3,
      label: "Animal Breeding",
      icon: "genetics",
      value: "animal breeding",
    },
    { id: 4, label: "Animal Welfare", icon: "pets", value: "animal welfare" },
    {
      id: 5,
      label: "Animal Husbandry",
      icon: "cruelty_free",
      value: "animal husbandry",
    },
  ] as const;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const selectedTopics = formData.getAll("topic") as PracticeTopic[];
    const questionType = formData.get("questionType") as QuestionType | null;
    const timePractice = formData.get("timePractice") === "time_practice";
    const showHint = formData.get("showHint") === "show_hints";
    const practiceDuration = Number(formData.get("practiceDuration") ?? 5);

    const settings: PracticeSettings = {
      topics: selectedTopics.length > 0 ? selectedTopics : [topics[0].value],
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
    <div className="practice page">
      <div className="container">
        <h1 className="page__title">Let's Put Your Knowledge to the Test!</h1>
        <p className="page__description">
          Select from a variety of topics, difficulty levels, and question types
          to customize your practice sessions. Whether you're a beginner or an
          expert, our practice questions are designed to challenge and enhance
          your understanding of scientific concepts.
        </p>

        <form
          className="practice__form m-block-start-4 p-3"
          onSubmit={handleSubmit}
        >
          <PracticeFieldset legend="Choose Topics You Want to cover:">
            <div className="practice__topic--list flex flex-wrap gap-2">
              {topics.map(({ id, label, icon, value }) => (
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

          <PracticeTiming />

          <button type="submit" className="btn btn--primary m-block-start-4">
            Start Practice
          </button>
        </form>
      </div>
    </div>
  );
};

export default Practice;
