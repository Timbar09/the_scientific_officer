import { FormField } from "../../../components/Form";

interface PracticeSettingHintOptionProps {
  enabled: boolean;
  onEnabledChange: (value: boolean) => void;
}

const PracticeSettingHintOption = ({
  enabled,
  onEnabledChange,
}: PracticeSettingHintOptionProps) => {
  const label = {
    text: "Show Hints",
    visible: true,
  };

  return (
    <FormField
      label={label}
      name="showHints"
      value="show_hints"
      checked={enabled}
      input={{ type: "checkbox", variant: "default" }}
      onChange={(event) => onEnabledChange(event.target.checked)}
    />
  );
};

export default PracticeSettingHintOption;
