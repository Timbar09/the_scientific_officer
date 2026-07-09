import { useState } from "react";
import { FormField, FormFieldset } from "../../../components/Form";

import type {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { titlize } from "../../../utils";

interface TopicProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errorMessage?: string;
  formSectionData: {
    name: string;
    practiceTopics: string[];
    selected: string[];
  };
}

const PracticeSettingTopicSection = ({
  register,
  setValue,
  errorMessage,
  formSectionData,
}: TopicProps) => {
  const { name, practiceTopics, selected } = formSectionData;

  const [value, setValueState] = useState<string[]>(selected || []);
  const isAllSelected =
    value.length === practiceTopics.length && practiceTopics.length > 0;

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;

    setValue(name, isChecked ? practiceTopics : []);
    setValueState(isChecked ? practiceTopics : []);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const topic = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setValue(name, [...value, topic]);
      setValueState([...value, topic]);
    } else {
      setValue(
        name,
        value.filter((t) => t !== topic),
      );
      setValueState(value.filter((t) => t !== topic));
    }
  };

  const label = {
    text: "Choose Topics You Want to cover",
    visible: true,
  };

  const displayError = errorMessage && value.length === 0;

  return (
    <FormFieldset label={label}>
      <SelectAllCheckbox
        isChecked={isAllSelected}
        onChange={handleSelectAllChange}
      />

      <ul className="practice__form--topic__list flex flex-wrap gap-1">
        {practiceTopics?.map((topic, i) => (
          <FormField
            key={topic}
            id={i + 1}
            containerElement="li"
            className="practice__form--topic__item"
            label={{ text: titlize(topic), visible: true }}
            input={{ type: "checkbox", variant: "tab" }}
            name={name}
            value={topic}
            register={register}
            rules={{ required: "Please select at least one topic." }}
            isChecked={selected.includes(topic)}
            onChange={handleTopicChange}
          />
        ))}
      </ul>

      {displayError ? (
        <p className="form__field--error__message m-block-start-1 clr-alert-800 fw-bold">
          {errorMessage}
        </p>
      ) : null}
    </FormFieldset>
  );
};

const SelectAllCheckbox = ({
  isChecked,
  onChange,
}: {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const label = {
    text: "Select All",
    visible: true,
    alignment: "row" as const,
  };

  return (
    <div className="practice__form--topic__selectAll">
      <FormField
        id={0}
        name="selectAllTopics"
        label={label}
        input={{ type: "checkbox", variant: "default" }}
        value="all"
        isChecked={isChecked}
        checked={isChecked}
        onChange={onChange}
      />
    </div>
  );
};

export default PracticeSettingTopicSection;
