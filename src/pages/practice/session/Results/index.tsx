import { useNavigate } from "react-router";

import type { SessionResults, Question } from "../../types";

import Summary from "./Summary";

interface Props {
  sessionResults: SessionResults;
  questions: Question[];
}

interface WrongAnswersProps {
  wrongAnswers: SessionResults["wrongAnswers"];
  questions: Question[];
}

const PracticeResults = ({ sessionResults, questions }: Props) => {
  const { wrongAnswers } = sessionResults;

  return (
    <div className="practice__results grid gap-4 m-block-start-4">
      <Summary {...sessionResults} />

      <WrongAnswersList wrongAnswers={wrongAnswers} questions={questions} />

      <Footer />
    </div>
  );
};

const WrongAnswersList = ({ wrongAnswers, questions }: WrongAnswersProps) => {
  const getWrongQuestion = (wrongAnswer: SessionResults["wrongAnswers"][0]) => {
    return questions.find((q) => q.id === wrongAnswer.questionId);
  };

  if (wrongAnswers.length === 0) {
    return null;
  }

  return (
    <section className="practice__results--wrong-answers p-3">
      <h3 className="text-xl m-block-end-2">Review Wrong Answers:</h3>
      <ul className="grid gap-3">
        {wrongAnswers.map((wrongAnswer) => {
          const question = getWrongQuestion(wrongAnswer);

          return (
            <li
              key={wrongAnswer.questionId}
              className="p-3"
              style={{ border: "1px solid #ddd" }}
            >
              <p>
                <strong>Question:</strong> {question?.text}
              </p>
              <p>
                <strong>Your Answer:</strong> {wrongAnswer.selectedAnswer}
              </p>
              <p>
                <strong>Correct Answer:</strong> {wrongAnswer.correctAnswer}
              </p>
              <p>
                <strong>Explanation:</strong> {question?.explanation}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="flex flex-wrap gap-2">
      <button
        type="button"
        className="btn btn--primary"
        onClick={() => navigate("/practice")}
      >
        Try Another Session
      </button>
      <button type="button" className="btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </footer>
  );
};

export default PracticeResults;
