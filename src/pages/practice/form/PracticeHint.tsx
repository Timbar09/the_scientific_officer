import { FormField } from "@/components/Form";

const PracticeHint = () => {
  const label = {
    text: "Show Hints",
    visible: true,
  };

  return (
    <FormField
      label={label}
      name="showHints"
      value="show_hints"
      input={{ type: "checkbox", variant: "default" }}
    />
  );
};

export default PracticeHint;
