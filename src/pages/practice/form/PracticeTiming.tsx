import { useState } from "react";

// import PracticeFieldset from "./PracticeFieldset";
import PracticeTimingInput from "./PracticeTimingInput";
import { FormField, FormFieldset } from "@/components/Form";

const PracticeTiming = () => {
  const [isChecked, setIsChecked] = useState(false);
  const label = {
    text: "Enable Timer",
    visible: true,
  };

  return (
    <FormFieldset label={label} className="flex gap-5 p-block-2">
      <FormField
        label={{ text: "Switch Timer On or Off", visible: false }}
        input={{ type: "checkbox", variant: "switch" }}
        name="sessionTimer"
        value="set_timer"
        onChange={(e) => setIsChecked(e.target.checked)}
      />

      <PracticeTimingInput enabled={isChecked} />
    </FormFieldset>
  );
};

export default PracticeTiming;
