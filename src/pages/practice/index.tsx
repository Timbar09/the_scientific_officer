import PracticeFieldset from "./PracticeFieldset";
import PracticeRadioButtons from "./PracticeRadioButtons";
import PracticeTiming from "./PracticeTiming";

const Practice = () => {
  const topics = [
    { id: 1, name: "Animal Health", icon: "cardiology" },
    { id: 2, name: "Animal Nutrition", icon: "nutrition" },
    { id: 3, name: "Animal Breeding", icon: "genetics" },
    { id: 4, name: "Animal Welfare", icon: "pets" },
    { id: 5, name: "Animal Husbandry", icon: "cruelty_free" },
  ];

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

        <form className="practice__form m-block-start-4 p-3">
          <PracticeFieldset legend="Choose Topics You Want to cover:">
            <div className="practice__checkbox--list flex flex-wrap gap-2">
              {topics.map(({ id, name, icon }) => (
                <label key={id} className="practice__checkbox--item grid">
                  <input
                    className="custom-input"
                    type="checkbox"
                    name="topic"
                    defaultChecked={id === 1}
                    value={name.toLowerCase()}
                  />{" "}
                  <span className="practice__checkbox--item__name custom-input__name p-block-2 p-inline-4">
                    {name}
                    <span className="material-symbols-outlined practice__checkbox--item__icon">
                      {icon}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </PracticeFieldset>

          <PracticeRadioButtons />

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
