import { useEffect, useState } from "react";
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
        isSessionSubmitted={session.isSubmitted}
        displayHint={settings.hintsEnabled && !isHintRevealed}
        onRevealHint={func.revealHint}
        settings={settings}
        questions={questions}
        submit={func.submit}
      />

      <div className="practice page">
        <Container>
          {!session.isSubmitted ? (
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
  displayHint,
  onRevealHint,
  settings,
  questions,
  submit,
  isSessionSubmitted,
}: PracticeSessionHeaderProps) => {
  const isHintBadgeEnabled = displayHint && !isSessionSubmitted;

  const layoutClassName = "flex flex-wrap gap-3 ai-center jc-between";

  return (
    <header className="header p-block-3 practice__header">
      <Container
        className={`practice__header--container ${layoutClassName} p-3`}
      >
        <div className="practice__header--left flex ai-center gap-3 gap-@lg-5">
          <PracticeSessionHeaderNav />
        </div>

        <div className="practice__header--middle">
          <div className="practice__header--badge__list flex ai-center gap-3">
            <HintBadge onClick={onRevealHint} enabled={isHintBadgeEnabled} />

            <QuestionsTypeBadge
              questionType={settings?.questionType || "all"}
            />

            {settings?.timerEnabled && (
              <TimerBadge
                duration={settings?.sessionDuration}
                submit={submit}
                isSessionSubmitted={isSessionSubmitted}
              />
            )}
          </div>
        </div>

        <div className="practice__header--right">
          <ProgressBar
            unanswered={questions.unansweredCount}
            total={questions.count}
            variant="stepped"
          />

          <Tooltip>
            {questions.count - questions.unansweredCount} out of{" "}
            {questions.count} questions answered.
          </Tooltip>
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
  responsiveItem = "value",
  onClick,
}: {
  className?: string;
  iconName: string;
  value: string;
  linkTo?: string;
  responsiveItem?: "value" | "icon";
  onClick?: () => void;
}) => {
  const isSmallScreen = useMediaQuery({ breakpoint: "sm" });
  const isClickable = !!linkTo || !!onClick;
  const isIconResponsive = responsiveItem === "icon";

  const baseCN = "practice__header--badge";
  const clickableClass = isClickable ? `${baseCN}__clickable` : "";
  const displayValueClass = isSmallScreen || isIconResponsive ? "" : "sr-only";
  const displayIconClass = isSmallScreen || !isIconResponsive ? "" : "sr-only";
  const classNames = `${baseCN} ${clickableClass} ${className} flex ai-center gap-1 p-1`;

  if (linkTo) {
    return (
      <NavLink to={linkTo} className={classNames}>
        <Icon
          name={iconName}
          className={`${baseCN}__icon ${displayIconClass}`}
        />

        <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
      </NavLink>
    );
  }

  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick}>
        <Icon
          name={iconName}
          className={`${baseCN}__icon ${displayIconClass}`}
        />

        <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
      </button>
    );
  }

  return (
    <div className={classNames}>
      <Icon name={iconName} className={`${baseCN}__icon ${displayIconClass}`} />

      <span className={`${baseCN}__value ${displayValueClass}`}>{value}</span>
    </div>
  );
};

const TimerBadge = ({
  duration,
  submit,
  isSessionSubmitted,
}: {
  duration: number;
  submit: () => void;
  isSessionSubmitted: boolean;
}) => {
  const [countdown, setCountdown] = useState(duration * 60);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setCountdown(duration * 60);
    setTimeLeft(null);
  }, [duration]);

  useEffect(() => {
    if (isSessionSubmitted) {
      setTimeLeft(countdown);
      return;
    }
  }, [isSessionSubmitted, countdown]);

  useEffect(() => {
    if (isSessionSubmitted) {
      return;
    }

    if (countdown <= 0) {
      submit();
      return;
    }

    const id = window.setInterval(
      () => setCountdown((s) => Math.max(s - 1, 0)),
      1000,
    );

    return () => window.clearInterval(id);
  }, [countdown, submit, isSessionSubmitted]);

  const timeDisplay =
    isSessionSubmitted && timeLeft !== null ? timeLeft : countdown;

  const timerWarning =
    timeDisplay <= 30 && !isSessionSubmitted
      ? "timer--warning-red"
      : timeDisplay <= 60 && !isSessionSubmitted
        ? "timer--warning-yellow"
        : "";

  return (
    <div className={`practice__header--timer ${timerWarning}`}>
      <Badge
        iconName="schedule"
        value={formatTime(timeDisplay)}
        responsiveItem="icon"
      />

      {isSessionSubmitted && (
        <Tooltip>
          {timeLeft === null || timeLeft <= 0
            ? "You have run out of time! Your session has been automatically submitted."
            : `Session completed with "${formatTime(timeLeft || 0, true)}" remaining.`}
        </Tooltip>
      )}
    </div>
  );
};

const QuestionsTypeBadge = ({ questionType }: { questionType: string }) => {
  return (
    <div className="practice__header--questionType">
      <Badge iconName="shield_question" value={titlize(questionType)} />

      <Tooltip>
        {questionType === "all"
          ? "All available question types are included in this session."
          : `Only ${titlize(questionType)} questions are included in this session.`}
      </Tooltip>
    </div>
  );
};

const HintBadge = ({
  onClick,
  enabled,
}: {
  onClick: (value: boolean) => void;
  enabled: boolean;
}) => {
  if (!enabled) {
    return null;
  }

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
  variant = "linear",
}: {
  unanswered: number;
  total: number;
  variant?: "linear" | "stepped";
}) => {
  const progressPercentage = ((total - unanswered) / total) * 100;
  const progressLabel = `${total - unanswered} out of ${total} answered`;
  const isStepped = variant === "stepped";

  const baseCN = "practice__header--progress";
  const typeBaseCN = `${baseCN}__${variant}`;
  const stepOrRailCN = isStepped ? "step" : "rail";

  return (
    <div className={`${baseCN} ${typeBaseCN} flex gap-1 ai-center`}>
      <div
        className={`${baseCN}__container ${typeBaseCN}--${stepOrRailCN}__container`}
      >
        {variant === "linear" ? (
          <div className={`${typeBaseCN}--rail`}>
            <div
              className={`${typeBaseCN}--rail__bar`}
              style={{ width: `${progressPercentage}%` }}
              aria-label={progressLabel}
              data-progress={progressLabel}
            ></div>
          </div>
        ) : (
          <>
            <div className={`${typeBaseCN}--step__list flex jc-between`}>
              {Array.from({ length: 50 }).map((_, index) => {
                const stepPercentage = ((index + 1) / 50) * 100;
                const isCompleted = stepPercentage <= progressPercentage;

                const stepCN = isCompleted
                  ? `${typeBaseCN}--step__item--completed`
                  : "";

                return (
                  <div
                    key={index}
                    className={`${typeBaseCN}--step__item ${stepCN}`}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className={`${baseCN}__value`}>
        {`${Math.round(progressPercentage)}%`}
      </div>
    </div>
  );
};

export default PracticeSession;
