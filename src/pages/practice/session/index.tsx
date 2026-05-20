import PracticeLoaderView from "./PracticeLoaderView";
import PracticeNoQuestionsView from "./PracticeNoQuestionsView";
import PracticeQuestionView from "./PracticeQuestionView";
import PracticeResults from "./PracticeResults";
import useSession from "@/hooks/useSession";

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

const HintBadge = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="practice__header--hint">
      <button
        type="button"
        className="practice__header--hint__button practice__header--badge flex ai-center gap-1 p-1"
        title="Get a Hint"
        onClick={onClick}
      >
        <span className="material-symbols-outlined practice__header--icon">
          lightbulb_2
        </span>
        <span className="practice__header--badge__value">Hint</span>
        {/* {session.settings.showHint ? "On" : "Off"} */}
      </button>
    </div>
  );
};

const ProgressBar = ({
  unanswered,
  total,
}: {
  unanswered: number;
  total: number;
}) => {
  const progressPercentage = ((total - unanswered) / total) * 100;
  const progressLabel = `${total - unanswered} out of ${total} answered`;

  return (
    <div className="practice__header--progress flex gap-1 ai-center">
      <div className="practice__header--progress__rail">
        <div
          className="practice__header--progress__bar"
          style={{ width: `${progressPercentage}%` }}
          aria-label={progressLabel}
          data-progress={progressLabel}
        ></div>
      </div>

      <div className="practice__header--progress__value">
        {`${Math.round(progressPercentage)}%`}
      </div>
    </div>
  );
};

const PracticeSession = () => {
  const session = useSession();
  const { settings, isHintRevealed, revealHint } = session;

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
          <div className="practice__header--container flex flex-col flex-@md-row gap-3 gap-@lg-5 ai-start ai-@md-center jc-between p-3">
            <div className="practice__header--left flex ai-center gap-3 gap-@lg-5">
              <h1 className="practice__title">
                {session.isComplete ? "Practice Results" : "Practice Session"}
              </h1>

              <div className="practice__header--left__progressbar">
                <ProgressBar
                  unanswered={session.unansweredCount}
                  total={session.filteredQuestions.length}
                />
              </div>
            </div>

            <div className="practice__header--right">
              <div className="practice__header--badge__list flex ai-center gap-3">
                {settings.showHint && !isHintRevealed && (
                  <HintBadge onClick={revealHint} />
                )}

                <QuestionsTypeBadge questionType={settings.questionType} />

                {settings.timePractice && (
                  <TimerBadge secondsRemaining={session.secondsRemaining} />
                )}
              </div>
            </div>
          </div>
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
