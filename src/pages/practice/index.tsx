import PracticeForm from "./form";

const Practice = () => {
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

        <PracticeForm />
      </div>
    </div>
  );
};

export default Practice;
