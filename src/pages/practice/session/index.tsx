import PracticeLoaderView from "./PracticeLoaderView";
import PracticeNoQuestionsView from "./PracticeNoQuestionsView";
import PracticeQuestionView from "./PracticeQuestionView";
import PracticeResults from "./PracticeResults";
import usePracticeSession from "../../../hooks/usePracticeSession";

import { formatTime } from "@/utils";

const Timer = ({ secondsRemaining }: { secondsRemaining: number }) => {
  const timerWarning =
    secondsRemaining <= 30
      ? "timer--warning-red"
      : secondsRemaining <= 60
        ? "timer--warning-yellow"
        : "";

  return (
    <div
      className={`practice__header--timer practice__header--badge flex ai-center gap-1 p-1 ${timerWarning}`}
      title="Time Remaining"
    >
      <span className="material-symbols-outlined practice__header--timer__icon">
        schedule
      </span>
      <span className="practice__header--timer__value fw-bold">
        {` ${formatTime(secondsRemaining)} Mins`}
      </span>
    </div>
  );
};

const PracticeSession = () => {
  const session = usePracticeSession();

  if (!session.settings || session.isLoading) {
    return <PracticeLoaderView />;
  }

  if (session.filteredQuestions.length === 0) {
    return (
      <div className="practice page">
        <div className="container">
          <PracticeNoQuestionsView />
        </div>
      </div>
    );
  }

  if (!session.currentQuestion || !session.currentVariant) {
    return null;
  }

  return (
    <div className="practice page">
      <div className="container">
        <header className="practice__header">
          <div className="practice__header--top flex ai-center jc-between p-3">
            <div className="practice__header--top__left">
              <h1 className="practice__title">
                {session.isComplete ? "Practice Results" : "Practice Session"}
              </h1>
            </div>

            <div className="practice__header--top__right flex ai-center gap-3">
              {session.settings.timePractice && (
                <Timer secondsRemaining={session.secondsRemaining} />
              )}
            </div>
          </div>

          <div className="practice__header--bottom">Progress Bar</div>
        </header>

        {!session.isComplete ? (
          <PracticeQuestionView session={session} />
        ) : session.results ? (
          <PracticeResults
            sessionResults={session.results}
            filteredQuestions={session.filteredQuestions}
            settings={session.settings}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PracticeSession;
