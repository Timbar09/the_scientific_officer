import { useState } from "react";

const PracticeTiming = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <fieldset className="practice__fieldset p-3 m-block-start-4">
      <legend className="practice__legend">Set Practice Timing:</legend>
      <div className="practice__timing--checkbox flex flex-wrap gap-2">
        <label
          className={`practice__timing--checkbox__label grid ${isChecked ? "checked" : ""}`}
        >
          <input
            type="checkbox"
            name="timePractice"
            value="time_practice"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />{" "}
          <div className="practice__timing--checkbox__slider"></div>
        </label>
      </div>
    </fieldset>
  );
};

export default PracticeTiming;
