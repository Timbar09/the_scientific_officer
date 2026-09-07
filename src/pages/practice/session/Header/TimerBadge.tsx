import { useEffect, useState } from "react";

import HeaderBadge from "./HeaderBadge";
import Tooltip from "../../../../components/Tooltip";

import { formatTime } from "../../../../utils";

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
      <HeaderBadge
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

export default TimerBadge;
