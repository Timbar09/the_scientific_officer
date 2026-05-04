import { useNavigate } from "react-router";

const PracticeNoQuestionsView = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="page__title">No Questions Found</h1>
      <p className="page__description">
        There are no questions in the database(JSON bank) for the selected
        topics and question type yet.
      </p>
      <p>
        You can either go back and select different topics/question types, or
        you can contribute to our question bank by submitting your own questions{" "}
        <a
          href="https://example.com/contribute"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>
      <button
        type="button"
        className="btn btn--primary"
        onClick={() => navigate("/practice")}
      >
        Back to Practice Setup
      </button>
    </>
  );
};

export default PracticeNoQuestionsView;
