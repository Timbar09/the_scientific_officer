import { FormField, FormFieldset } from "@/components/Form";

import { usePracticeSettings } from "@/hooks/usePracticeSettings";

import { titlize } from "@/utils";

const PracticeSettingTopicSection = () => {
  const { practiceTopics } = usePracticeSettings();

  const label = {
    text: "Choose Topics You Want to cover",
    visible: true,
  };

  return (
    <section className="practice__form--topic practice__form--section p-3">
      <FormFieldset label={label}>
        <ul className="practice__form--topic__list flex flex-wrap gap-1">
          {practiceTopics.map((topic, i) => (
            <FormField
              key={topic}
              containerElement="li"
              className="practice__form--topic__item"
              label={{ text: titlize(topic), visible: true }}
              input={{ type: "checkbox", variant: "tab" }}
              name="topic"
              value={topic}
              checked={i === 0}
            />
          ))}
        </ul>
      </FormFieldset>
    </section>
  );
};

export default PracticeSettingTopicSection;
