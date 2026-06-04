import { useState } from "react";

import Icon from "@components/Icon";

const MIN_TIME = 5;
const TIME_STEP = 5;
const MAX_TIME = 120;

interface ButtonProps {
  onClick: () => void;
  controlType: "increase" | "decrease";
}

const TimeControlButton = ({ onClick, controlType }: ButtonProps) => {
  const icon = controlType === "increase" ? "add" : "remove";
  const buttonClass = `practice__form--timer__value--button practice__form--timer__value--${controlType} flex jc-center ai-center p-1`;

  return (
    <button
      type="button"
      aria-label={`${controlType} practice duration`}
      className={buttonClass}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
};

const PracticeSettingTimerOptionValue = ({ enabled }: { enabled: boolean }) => {
  const [timeDisplay, setTimeDisplay] = useState(MIN_TIME);

  const increaseTime = () => {
    setTimeDisplay((prev) => Math.min(prev + TIME_STEP, MAX_TIME));
  };

  const decreaseTime = () => {
    setTimeDisplay((prev) => Math.max(prev - TIME_STEP, MIN_TIME));
  };

  const style = {
    "--indicator-width": `${(timeDisplay / (MAX_TIME - MIN_TIME)) * 100}%`,
  } as React.CSSProperties;

  return (
    <fieldset
      className={`practice__form--timer__value ${enabled ? "" : "disabled"}`}
      inert={!enabled}
      aria-disabled={!enabled}
      data-min={MIN_TIME}
      data-max={MAX_TIME}
    >
      <label
        id="practiceDurationLabel"
        htmlFor="practiceDuration"
        className="sr-only"
      >
        Practice Duration (minutes):
      </label>

      <div
        className="practice__form--timer__value--controls flex-inline"
        style={style}
      >
        <TimeControlButton onClick={decreaseTime} controlType="decrease" />

        <output
          id="practiceDurationOutput"
          className="practice__form--timer__value--display flex jc-center ai-center"
          htmlFor="practiceDuration"
        >
          {timeDisplay}
        </output>

        <TimeControlButton onClick={increaseTime} controlType="increase" />

        <div className="practice__form--timer__value--indicator" />
      </div>

      <input
        className="practice__form--timer__value--input custom-input"
        type="hidden"
        id="practiceDuration"
        name="practiceDuration"
        value={timeDisplay}
        min="5"
        max="120"
        readOnly
      />
    </fieldset>
  );
};

export default PracticeSettingTimerOptionValue;
