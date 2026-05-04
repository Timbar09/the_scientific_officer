import { useState } from "react";

import PracticeFieldset from "./PracticeFieldset";

const PracticeHint = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <PracticeFieldset legend="Hints:">
      <label
        className={`practice__hint--label grid ${isChecked ? "checked" : ""}`}
      >
        <input
          className="custom-input"
          type="checkbox"
          name="showHint"
          value="show_hints"
          checked={isChecked}
          onChange={(event) => setIsChecked(event.target.checked)}
        />{" "}
        <span className="custom-input__name p-block-1 p-inline-3">
          Show hints during practice
        </span>
      </label>
    </PracticeFieldset>
  );
};

export default PracticeHint;
