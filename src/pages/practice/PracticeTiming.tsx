import { useState } from "react";

import PracticeFieldset from "./PracticeFieldset";

const PracticeTiming = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <PracticeFieldset legend="Set Practice Timing:">
      <div className="practice__timing--checkbox flex flex-wrap gap-2">
        <label
          className={`practice__timing--checkbox__label grid ${isChecked ? "checked" : ""}`}
        >
          <input
            className="custom-input"
            type="checkbox"
            name="timePractice"
            value="time_practice"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />{" "}
          <div className="practice__timing--checkbox__slider"></div>
        </label>
      </div>
    </PracticeFieldset>
  );
};

export default PracticeTiming;
