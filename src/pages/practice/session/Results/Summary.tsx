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

const BASE_CN = "practice__results";

const Summary = ({
  score,
  correctCount,
  wrongAnswers,
  unansweredQuestions,
}: SessionResults) => {
  const metrics = [
    {
      id: "correct",
      title: "Correct",
      value: correctCount,
    },
    {
      id: "wrong",
      title: "Wrong",
      value: wrongAnswers.length,
    },
    {
      id: "unanswered",
      title: "Unanswered",
      value: unansweredQuestions.length,
    },
  ];

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

  const baseCN = `${BASE_CN}--summary`;
  const containerCN = `${baseCN} flex flex-col flex-@md-row jc-between ai-center`;

  return (
    <section className={containerCN}>
      <div className={`${baseCN}__left flex gap-1`}>
        <div className={`${BASE_CN}--score ${BASE_CN}--score__${category} p-3`}>
          <h2>
            <span className={`${BASE_CN}--title`}>FINAL SCORE</span>

            <span className={`${BASE_CN}--score__value`}>{score}%</span>
          </h2>
        </div>

        <div className={`${BASE_CN}--verdict p-3`}>
          <h3 className="fs-lg">{verdict.title}</h3>
          <p className="m-block-start-1">{verdict.message}</p>
        </div>
      </div>

      <div className="practice__results--summary__right flex">
        {metrics.map((metric) => {
          const itemCN = `${baseCN}__right--item p-3`;
          const valueCN = `${baseCN}__right--item__value ${baseCN}__right--item__value--${metric.id}`;
          const titleCN = `${BASE_CN}--title`;

          return (
            <div key={metric.id} className={itemCN}>
              <h3>
                <span className={valueCN}>{metric.value}</span>
                <span className={titleCN}>{metric.title.toUpperCase()}</span>
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Summary;
