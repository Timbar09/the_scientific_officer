import type { FieldValues, UseFormRegister } from "react-hook-form";

import { FormField } from "../../../components/Form";

interface HintOptionProps {
  register: UseFormRegister<FieldValues>;
  formSectionData: {
    name: string;
    defaultValue: boolean;
    hasHints: boolean;
  };
}

const PracticeSettingHintOption = ({
  register,
  formSectionData,
}: HintOptionProps) => {
  const { name, hasHints } = formSectionData;

  const label = {
    text: "Show Hints",
    visible: true,
  };

  return (
    <FormField
      id={0}
      label={label}
      input={{ type: "checkbox", variant: "default" }}
      name={name}
      value="show_hints"
      isChecked={hasHints}
      register={register}
    />
  );
};

export default PracticeSettingHintOption;
