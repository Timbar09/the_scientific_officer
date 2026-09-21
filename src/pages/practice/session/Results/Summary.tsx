import type { SessionResults } from "../../types";

type ScoreCategoryKey =
  | "abysmal"
  | "poor"
  | "fair"
  | "good"
  | "veryGood"
  | "excellent"
  | "perfect";
interface ScoreCategory {
  id: ScoreCategoryKey;
  title: string;
  message: string;
}

const Summary = ({
  score,
  correctCount,
  wrongAnswers,
  unansweredQuestions,
}: SessionResults) => {
  const scoreData: Record<ScoreCategoryKey, ScoreCategory> = {
    abysmal: {
      id: "abysmal",
      title: "Very Low",
      message: "Review basics and retry — try the quick-start guide.",
    },
    poor: {
      id: "poor",
      title: "Below Average",
      message: "Focus on fundamentals; practice a few focused topics.",
    },
    fair: {
      id: "fair",
      title: "Average",
      message: "Decent — review weak areas and retry the session.",
    },
    good: {
      id: "good",
      title: "Good Job",
      message: "Solid performance — keep practicing to level up.",
    },
    veryGood: {
      id: "veryGood",
      title: "Very Good",
      message: "Great work — try a harder set for challenge.",
    },
    excellent: {
      id: "excellent",
      title: "Excellent",
      message: "Excellent — you mastered most topics.",
    },
    perfect: {
      id: "perfect",
      title: "Perfect Score! 🎉",
      message: "Flawless! Consider sharing your score.",
    },
  };

  function getCategory(score: number): ScoreCategoryKey {
    if (!Number.isFinite(score) || score <= 0) return "abysmal";
    if (score >= 100) return "perfect";
    if (score >= 90) return "excellent";
    if (score >= 80) return "veryGood";
    if (score >= 70) return "good";
    if (score >= 55) return "fair";
    return "poor";
  }

  const category = getCategory(score);
  const verdict = scoreData[category as keyof typeof scoreData];

  return (
    <section className="practice__results--summary flex flex-col flex-@md-row jc-between ai-center">
      <div className="practice__results--right flex gap-1">
        <div
          className={`practice__results--score practice__results--score__${category} p-3`}
        >
          <h2>
            <span className="practice__results--title">FINAL SCORE</span>

            <span className="practice__results--score__value">{score}%</span>
          </h2>
        </div>

        <div className="practice__results--verdict p-3">
          <h3 className="fs-lg">{verdict.title}</h3>
          <p className="m-block-start-1">{verdict.message}</p>
        </div>
      </div>

      <div className="practice__results--detail flex">
        <div className="practice__results--detail__item p-3">
          <h3>
            <span className="practice__results--detail__item--value practice__results--detail__item--value__correct">
              {correctCount}
            </span>

            <span className="practice__results--title">CORRECT</span>
          </h3>
        </div>

        <div className="practice__results--detail__item p-3">
          <h3>
            <span className="practice__results--detail__item--value practice__results--detail__item--value__wrong">
              {wrongAnswers.length}
            </span>
            <span className="practice__results--title">WRONG</span>
          </h3>
        </div>

        <div className="practice__results--detail__item p-3">
          <h3>
            <span className="practice__results--detail__item--value practice__results--detail__item--value__unanswered">
              {unansweredQuestions.length}
            </span>
            <span className="practice__results--title">UNANSWERED</span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Summary;
