// import PracticeFieldset from "./PracticeFieldset";
import PracticeTimingInput from "./PracticeSettingTimerOptionValue";
import { FormField, FormFieldset } from "../../../components/Form";

interface PracticeTimingProps {
  enabled: boolean;
  onEnabledChange: (value: boolean) => void;
  value: number;
  onValueChange: (value: number) => void;
}

const PracticeTiming = ({
  enabled,
  onEnabledChange,
  value,
  onValueChange,
}: PracticeTimingProps) => {
  const label = {
    text: "Enable Timer",
    visible: true,
  };

  return (
    <FormFieldset label={label} className="flex gap-5">
      <FormField
        label={{ text: "Switch Timer On or Off", visible: false }}
        input={{ type: "checkbox", variant: "switch" }}
        name="sessionTimer"
        value="set_timer"
        checked={enabled}
        onChange={(e) => onEnabledChange(e.target.checked)}
      />

      <PracticeTimingInput
        enabled={enabled}
        value={value}
        onValueChange={onValueChange}
      />
    </FormFieldset>
  );
};

export default PracticeTiming;
