import { useState } from "react";

const PracticeSettingTimerOptionValue = ({ enabled }: { enabled: boolean }) => {
  const [timeDisplay, setTimeDisplay] = useState("005");

  const increaseTime = () => {
    setTimeDisplay((prev) =>
      Math.min(parseInt(prev, 10) + 5, 120)
        .toString()
        .padStart(3, "0"),
    );
  };

  const decreaseTime = () => {
    setTimeDisplay((prev) =>
      Math.max(parseInt(prev, 10) - 5, 5)
        .toString()
        .padStart(3, "0"),
    );
  };

  return (
    <div
      className={`practice__timing--value flex flex-col gap-1 m-inline-5 ${enabled ? "" : "disabled"}`}
      inert={!enabled}
      aria-disabled={!enabled}
    >
      <label htmlFor="practiceDuration" className="font-medium">
        Practice Duration (minutes):
      </label>

      <div className="practice__timing--value__controls flex-inline">
        <button
          type="button"
          className="practice__timing--value__decrease flex jc-center ai-center"
          onClick={decreaseTime}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <span className="practice__timing--value__display flex jc-center ai-center">
          {timeDisplay}
        </span>
        <button
          type="button"
          className="practice__timing--value__increase flex jc-center ai-center"
          onClick={increaseTime}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <input
        className="practice__timing--value__input custom-input"
        type="hidden"
        id="practiceDuration"
        name="practiceDuration"
        value={timeDisplay}
        min="5"
        max="120"
        readOnly
      />
    </div>
  );
};

export default PracticeSettingTimerOptionValue;
