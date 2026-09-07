import TimerBadge from "./TimerBadge";
import HeaderBadge from "./HeaderBadge";
import ProgressBar from "./ProgressBar";
import Tooltip from "../../../../components/Tooltip";
import Container from "../../../../components/Container";

import type { PracticeSessionHeaderProps } from "../types";

import { titlize } from "../../../../utils";

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
      <HeaderBadge iconName="home" value="Home" linkTo="/" />

      <HeaderBadge iconName="add" value="New Session" linkTo="/practice" />
    </div>
  );
};

const QuestionsTypeBadge = ({ questionType }: { questionType: string }) => {
  return (
    <div className="practice__header--questionType">
      <HeaderBadge iconName="shield_question" value={titlize(questionType)} />

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
      <HeaderBadge
        iconName="lightbulb_2"
        value="Hint"
        onClick={() => onClick(true)}
      />

      <Tooltip>Get a hint!</Tooltip>
    </div>
  );
};

export default PracticeSessionHeader;
