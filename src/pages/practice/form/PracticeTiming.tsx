import { useState } from "react";

import PracticeFieldset from "./PracticeFieldset";
import PracticeTimingInput from "./PracticeTimingInput";

const PracticeTiming = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <PracticeFieldset legend="Set Practice Timing:">
      <div className="flex gap-5">
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

        <PracticeTimingInput enabled={isChecked} />
      </div>
    </PracticeFieldset>
  );
};

export default PracticeTiming;
