import { useEffect, useState } from "react";
import useSession from "../../../hooks/useSession";

import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Container from "../../../components/Container";

import PracticeResults from "./PracticeResults";
import PracticeLoaderView from "./PracticeLoaderView";
import PracticeQuestionView from "./PracticeQuestionView";
import PracticeNoQuestionsView from "./PracticeNoQuestionsView";

import { formatTime, titlize } from "../../../utils";

const PracticeSession = () => {
  const session = useSession();
  const { settings, func, questions, revealedHintQuestionIds } = session;
  const { list, loading, current, unansweredCount } = questions;

  const isHintRevealed = current.question
    ? revealedHintQuestionIds.has(current.question.id)
    : false;

  if (!settings || loading) {
    return <PracticeLoaderView />;
  }

  if (list.length === 0) {
    return (
      <div className="practice page">
        <Container>
          <PracticeNoQuestionsView />
        </Container>
      </div>
    );
  }

  if (!current.question) {
    return null;
  }

  return (
    <div className="practice page">
      <Container>
        <header className="practice__header">
          <div className="practice__header--container flex flex-col flex-@md-row gap-3 gap-@lg-5 ai-start ai-@md-center jc-between p-3">
            <div className="practice__header--left flex ai-center gap-3 gap-@lg-5">
              <h1 className="practice__title">
                {session.isComplete ? "Practice Results" : "Practice Session"}
              </h1>

              <div className="practice__header--left__progressbar">
                <ProgressBar unanswered={unansweredCount} total={list.length} />
              </div>
            </div>

            <div className="practice__header--right">
              <div className="practice__header--badge__list flex ai-center gap-3">
                {settings.hintsEnabled && !isHintRevealed && (
                  <HintBadge onClick={func.revealHint} />
                )}

                <QuestionsTypeBadge questionType={settings.questionType} />

                {settings.timerEnabled && (
                  <TimerBadge duration={settings.sessionDuration} />
                )}
              </div>
            </div>
          </div>
        </header>

        {!session.isComplete ? (
          <PracticeQuestionView session={session} />
        ) : session.results ? (
          <PracticeResults sessionResults={session.results} questions={list} />
        ) : null}
      </Container>
    </div>
  );
};

const TimerBadge = ({ duration }: { duration: number }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(duration * 60);

  useEffect(() => {
    setSecondsRemaining(duration * 60);
    const id = window.setInterval(
      () => setSecondsRemaining((s) => Math.max(s - 1, 0)),
      1000,
    );
    return () => window.clearInterval(id);
  }, [duration]);

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
      <Icon name="schedule" className="practice__header--timer__icon" />

      <span className="practice__header--timer__value fw-bold">
        {` ${formatTime(secondsRemaining)} Mins`}
      </span>
    </div>
  );
};

const QuestionsTypeBadge = ({ questionType }: { questionType: string }) => {
  return (
    <div className="practice__header--badge flex ai-center gap-1 p-1">
      <Icon name="quiz" className="practice__header--icon" />

      <span className="practice__header--badge__value">
        {titlize(questionType)}
      </span>
    </div>
  );
};

const HintBadge = ({ onClick }: { onClick: (value: boolean) => void }) => {
  return (
    <div className="practice__header--hint">
      <button
        type="button"
        className="practice__header--hint__button practice__header--badge flex ai-center gap-1 p-1"
        onClick={() => onClick(true)}
      >
        <Icon name="lightbulb_2" className="practice__header--icon" />

        <span className="practice__header--badge__value">Hint</span>
      </button>

      <Tooltip>Get a hint!</Tooltip>
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

export default PracticeSession;
