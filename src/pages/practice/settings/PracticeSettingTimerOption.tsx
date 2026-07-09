import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { FormField, FormFieldset } from "../../../components/Form";
import PracticeTimingInput from "./PracticeSettingTimerOptionValue";

interface TimerOptionProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  formSectionData: {
    name: string;
    defaultValue: boolean;
    isTimed: boolean;
    value: string | number | boolean;
  };
}

const PracticeSettingTimerOption = ({
  register,
  setValue,
  formSectionData,
}: TimerOptionProps) => {
  const { name, value, isTimed } = formSectionData;

  const label = {
    text: "Enable Timer",
    visible: true,
  };

  const handleTimerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setValue(name, isChecked);
  };

  return (
    <FormFieldset label={label} className="flex gap-5">
      <FormField
        id={0}
        label={{ text: "Switch Timer On or Off", visible: false }}
        input={{ type: "checkbox", variant: "switch" }}
        name={name}
        value={value.toString()}
        isChecked={isTimed}
        register={register}
        onChange={handleTimerChange}
      />

      <PracticeTimingInput
        register={register}
        setValue={setValue}
        enabled={isTimed}
      />
    </FormFieldset>
  );
};

export default PracticeSettingTimerOption;
