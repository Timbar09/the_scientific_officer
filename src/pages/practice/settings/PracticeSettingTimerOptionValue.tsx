import { useEffect, useState } from "react";

import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import Icon from "../../../components/Icon";

const MIN_TIME = 2;
const TIME_STEP = 2;
const MAX_TIME = 120;

interface ButtonProps {
  onClick: () => void;
  controlType: "increase" | "decrease";
}

interface PracticeSettingTimerOptionValueProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  enabled: boolean;
}

const PracticeSettingTimerOptionValue = ({
  enabled,
  register,
  setValue,
}: PracticeSettingTimerOptionValueProps) => {
  const [timeDisplay, setTimeDisplay] = useState(MIN_TIME);

  const increaseTime = () => {
    setTimeDisplay(Math.min(timeDisplay + TIME_STEP, MAX_TIME));
  };

  const decreaseTime = () => {
    setTimeDisplay(Math.max(timeDisplay - TIME_STEP, MIN_TIME));
  };

  useEffect(() => {
    setValue("timerValue", timeDisplay, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [setValue, timeDisplay]);

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
        <TimerControlButton onClick={decreaseTime} controlType="decrease" />

        <output
          id="practiceDurationOutput"
          className="practice__form--timer__value--display flex jc-center ai-center"
          htmlFor="practiceDuration"
        >
          {`${timeDisplay} mins`}
        </output>

        <TimerControlButton onClick={increaseTime} controlType="increase" />

        <div className="practice__form--timer__value--indicator" />
      </div>

      <input
        className="practice__form--timer__value--input custom-input"
        type="hidden"
        id="practiceDuration"
        readOnly
        {...register("timerValue", {
          min: MIN_TIME,
          max: MAX_TIME,
        })}
      />
    </fieldset>
  );
};

const TimerControlButton = ({ onClick, controlType }: ButtonProps) => {
  const icon = controlType === "increase" ? "add" : "remove";
  const buttonClass = `practice__form--timer__value--${controlType} flex jc-center ai-center p-1`;

  return (
    <button
      type="button"
      aria-label={`${controlType} practice duration`}
      className={`practice__form--timer__value--button ${buttonClass}`}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
};

export default PracticeSettingTimerOptionValue;
