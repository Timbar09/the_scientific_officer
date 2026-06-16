import { FormField, FormFieldset } from "../../../components/Form";

import type { FieldValues, UseFormRegister } from "react-hook-form";

import { titlize } from "../../../utils";

interface TopicProps {
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
  formSectionData: {
    name: string;
    practiceTopics: string[];
    selected: string[];
    isAllSelected: boolean;
  };
}

const PracticeSettingTopicSection = ({
  register,
  errorMessage,
  formSectionData,
}: TopicProps) => {
  const { name, practiceTopics, selected, isAllSelected } = formSectionData;

  const label = {
    text: "Choose Topics You Want to cover",
    visible: true,
  };

  return (
    <FormFieldset label={label}>
      <div className="practice__form--topic__selectAll">
        <FormField
          id={0}
          name={name}
          label={{ text: "Select All", visible: true, alignment: "row" }}
          input={{ type: "checkbox", variant: "default" }}
          value="all"
          register={register}
          checked={isAllSelected}
        />
      </div>

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
            checked={selected.includes(topic)}
          />
        ))}
      </ul>

      {errorMessage ? (
        <p className="form__field--error__message m-block-start-1 clr-alert-800 fw-bold">
          {errorMessage}
        </p>
      ) : null}
    </FormFieldset>
  );
};

export default PracticeSettingTopicSection;
