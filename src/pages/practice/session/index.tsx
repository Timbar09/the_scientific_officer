import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

import useSession from "../../../hooks/useSession";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

import type { PracticeSessionHeaderProps } from "./types";

import Icon from "../../../components/Icon";
import Tooltip from "../../../components/Tooltip";
import Container from "../../../components/Container";

import Loader from "./Loader";
import Results from "./Results";
import QuestionView from "./QuestionView";
import NoQuestionsView from "./NoQuestionsView";

import { formatTime, titlize } from "../../../utils";

const PracticeSession = () => {
  const session = useSession();
  const { settings, func, questions, revealedHintQuestionIds } = session;
  const { list, loading, current } = questions;

  const isHintRevealed = current.question
    ? revealedHintQuestionIds.has(current.question.id)
    : false;

  if (!settings || loading) {
    return <Loader />;
  }

  if (list.length === 0) {
    return (
      <div className="practice page">
        <Container>
          <NoQuestionsView />
        </Container>
      </div>
    );
  }

  if (!current.question) {
    return null;
  }

  return (
    <>
      <PracticeSessionHeader
        isSessionComplete={session.isComplete}
        displayHint={settings.hintsEnabled && !isHintRevealed}
        onRevealHint={func.revealHint}
        settings={settings}
        questions={questions}
        submit={func.submit}
      />

      <div className="practice page">
        <Container>
          {!session.isComplete ? (
            <QuestionView session={session} />
          ) : session.results ? (
            <Results sessionResults={session.results} questions={list} />
          ) : null}
        </Container>
      </div>
    </>
  );
};

const PracticeSessionHeader = ({
  isSessionComplete,
  displayHint,
  onRevealHint,
  settings,
  questions,
  submit,
}: PracticeSessionHeaderProps) => {
  const layoutClassName =
    "flex flex-col flex-@md-row gap-3 gap-@lg-5 ai-start ai-@md-center jc-between";

  return (
    <header className="header p-block-3 practice__header">
      <Container
        className={`practice__header--container ${layoutClassName} p-3`}
        size="lg"
      >
        <div className="practice__header--left flex ai-center gap-3 gap-@lg-5">
          <PracticeSessionHeaderNav />

          <h1 className="practice__title">
            {isSessionComplete ? "Practice Results" : "Practice Session"}
          </h1>

          <div className="practice__header--left__progressbar">
            <ProgressBar
              unanswered={questions.unansweredCount}
              total={questions.count}
            />
          </div>
        </div>

        <div className="practice__header--right">
          <div className="practice__header--badge__list flex ai-center gap-3">
            {displayHint && <HintBadge onClick={onRevealHint} />}

            <QuestionsTypeBadge
              questionType={settings?.questionType || "all"}
            />

            {settings?.timerEnabled && (
              <TimerBadge
                duration={settings?.sessionDuration}
                submit={submit}
              />
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

const PracticeSessionHeaderNav = () => {
  return (
    <div className="practice__header--nav flex gap-2 ai-center">
      <Badge iconName="home" value="Home" linkTo="/" />

      <Badge iconName="add" value="New Session" linkTo="/practice" />
    </div>
  );
};

const Badge = ({
  className = "",
  iconName,
  value,
  linkTo,
  onClick,
}: {
  className?: string;
  iconName: string;
  value: string;
  linkTo?: string;
  onClick?: () => void;
}) => {
  const isMediumScreen = useMediaQuery({ breakpoint: "md" });
  const isClickable = !!linkTo || !!onClick;

  const baseCN = "practice__header--badge";
  const clickableClass = isClickable ? `${baseCN}__clickable` : "";
  const displayValueClass = isMediumScreen ? "" : "sr-only";
  const classNames = `${baseCN} ${clickableClass} ${className} flex ai-center gap-1 p-1`;

  if (linkTo) {
    return (
      <NavLink to={linkTo} className={classNames}>
        <Icon name={iconName} className={`${baseCN}__icon`} />

        <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
      </NavLink>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick}>
        <Icon name={iconName} className={`${baseCN}__icon`} />

        <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
      </button>
    );
  }

  return (
    <div className={classNames}>
      <Icon name={iconName} className={`${baseCN}__icon`} />

      <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
    </div>
  );
};

const TimerBadge = ({
  duration,
  submit,
}: {
  duration: number;
  submit: () => void;
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(duration * 60);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    setSecondsRemaining(duration * 60);
    hasSubmittedRef.current = false;
  }, [duration]);

  useEffect(() => {
    if (secondsRemaining <= 0) {
      if (!hasSubmittedRef.current) {
        hasSubmittedRef.current = true;
        submit();
      }
      return;
    }

    const id = window.setInterval(
      () => setSecondsRemaining((s) => Math.max(s - 1, 0)),
      1000,
    );

    return () => window.clearInterval(id);
  }, [secondsRemaining, submit]);

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
    <div className="practice__header--questionType">
      <Badge iconName="quiz" value={titlize(questionType)} />

      <Tooltip>
        {questionType === "all"
          ? "All available question types are included in this session."
          : `Only ${titlize(questionType)} questions are included in this session.`}
      </Tooltip>
    </div>
  );
};

const HintBadge = ({ onClick }: { onClick: (value: boolean) => void }) => {
  return (
    <div className="practice__header--hint">
      <Badge
        iconName="lightbulb_2"
        value="Hint"
        onClick={() => onClick(true)}
      />

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
