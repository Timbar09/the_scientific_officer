import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { FormField } from "../../../components/Form";

interface HintOptionProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  formSectionData: {
    name: string;
    defaultValue: boolean;
    hasHints: boolean;
  };
}

const PracticeSettingHintOption = ({
  register,
  setValue,
  formSectionData,
}: HintOptionProps) => {
  const { name, hasHints } = formSectionData;

  const label = {
    text: "Show Hints",
    visible: true,
  };

  const handleHintChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setValue(name, isChecked);
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
      onChange={handleHintChange}
    />
  );
};

export default PracticeSettingHintOption;
