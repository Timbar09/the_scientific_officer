import { useNavigate } from "react-router";
import type { QuestionData, SessionSettings, SessionResults } from "../types";

interface Props {
  sessionResults: SessionResults;
  questions: QuestionData[];
  settings: SessionSettings;
}

const PracticeResults = ({ sessionResults, questions, settings }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="practice__results grid gap-4 m-block-start-4">
      <section className="practice__results--summary p-3">
        <h2 className="text-3xl m-block-end-2">
          Final Score: {sessionResults.score}%
        </h2>
        <p className="text-lg">
          <strong>Correct Answers:</strong> {sessionResults.correctAnswers} of{" "}
          {sessionResults.totalQuestions}
        </p>
        <p className="text-lg">
          <strong>Wrong Answers:</strong> {sessionResults.wrongAnswers.length}
        </p>
      </section>

      {sessionResults.wrongAnswers.length > 0 ? (
        <section className="practice__results--wrong-answers p-3">
          <h3 className="text-xl m-block-end-2">Review Wrong Answers:</h3>
          <ul className="grid gap-3">
            {sessionResults.wrongAnswers.map((wrongAnswer) => {
              const question = questions.find(
                (q) => q.id === wrongAnswer.questionId,
              );
              const variant =
                question?.variants[
                  settings.questionType as keyof typeof question.variants
                ];
              return (
                <li
                  key={wrongAnswer.questionId}
                  className="p-3"
                  style={{ border: "1px solid #ddd" }}
                >
                  <p>
                    <strong>QuestionData:</strong> {variant?.question}
                  </p>
                  <p>
                    <strong>Your Answer:</strong> {wrongAnswer.selectedAnswer}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong> {wrongAnswer.correctAnswer}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {variant?.explanation}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : (
        <section className="practice__results--perfect p-3">
          <h3 className="text-xl">Perfect Score! 🎉</h3>
          <p>You got all questions correct!</p>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
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
      </div>
    </div>
  );
};

export default PracticeResults;
