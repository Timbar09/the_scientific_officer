import PracticeLoaderView from "./PracticeLoaderView";
import PracticeNoQuestionsView from "./PracticeNoQuestionsView";
import PracticeQuestionView from "./PracticeQuestionView";
import PracticeResults from "./PracticeResults";
import usePracticeSession from "../../../hooks/usePracticeSession";

import { formatTime, titlize } from "@/utils";

const TimerBadge = ({ secondsRemaining }: { secondsRemaining: number }) => {
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

const QuestionsTypeBadge = ({ questionType }: { questionType: string }) => {
  return (
    <div className="practice__header--badge flex ai-center gap-1 p-1">
      <span className="material-symbols-outlined practice__header--icon">
        quiz
      </span>
      <span className="practice__header--badge__value">
        {titlize(questionType)}
      </span>
    </div>
  );
};

const PracticeSession = () => {
  const session = usePracticeSession();
  const { settings } = session;

  if (!settings || session.isLoading) {
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
              <QuestionsTypeBadge questionType={settings.questionType} />

              {settings.timePractice && (
                <TimerBadge secondsRemaining={session.secondsRemaining} />
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
            settings={settings}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PracticeSession;
