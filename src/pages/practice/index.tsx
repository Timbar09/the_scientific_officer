import SessionSettingsForm from "./settings";
import Container from "../../components/Container";

const Practice = () => {
  return (
    <div className="practice page">
      <Container>
        <div className="p-4">
          <h1 className="page__title">Let's Put Your Knowledge to the Test!</h1>

          <p className="page__description m-block-start-1">
            Select from a variety of topics, difficulty levels, and question
            types to customize your practice sessions. Whether you're a beginner
            or an expert, our practice questions are designed to challenge and
            enhance your understanding of scientific concepts.
          </p>
        </div>

        <SessionSettingsForm />
      </Container>
    </div>
  );
};

export default Practice;
