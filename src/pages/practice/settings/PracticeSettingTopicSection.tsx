import { useEffect, useRef } from "react";

import { FormField, FormFieldset } from "../../../components/Form";

import { titlize } from "../../../utils";

interface PracticeSettingTopicSectionProps {
  selectedTopics: string[];
  onTopicsChange: (topics: string[]) => void;
  error?: string;
  practiceTopics: string[];
}

const PracticeSettingTopicSection = ({
  selectedTopics,
  onTopicsChange,
  error,
  practiceTopics,
}: PracticeSettingTopicSectionProps) => {
  const initializedDefaultTopic = useRef(false);

  useEffect(() => {
    if (!initializedDefaultTopic.current && practiceTopics.length > 0) {
      initializedDefaultTopic.current = true;
      onTopicsChange([practiceTopics[0]]);
    }
  }, [practiceTopics, onTopicsChange]);

  const isSelectAllChecked =
    practiceTopics.length > 0 &&
    selectedTopics.length === practiceTopics.length;

  const handleSelectAllChange = (checked: boolean) => {
    onTopicsChange(checked ? [...practiceTopics] : []);
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    const nextTopics = checked
      ? Array.from(new Set([...selectedTopics, topic]))
      : selectedTopics.filter((currentTopic) => currentTopic !== topic);

    onTopicsChange(nextTopics);
  };

  const label = {
    text: "Choose Topics You Want to cover",
    visible: true,
  };

  return (
    <FormFieldset label={label}>
      <div className="practice__form--topic__selectAll">
        <FormField
          name="selectAllTopics"
          label={{ text: "Select All", visible: true, alignment: "row" }}
          input={{ type: "checkbox", variant: "default" }}
          value="all"
          checked={isSelectAllChecked}
          onChange={(event) => handleSelectAllChange(event.target.checked)}
        />
      </div>

      <ul className="practice__form--topic__list flex flex-wrap gap-1">
        {practiceTopics.map((topic) => (
          <FormField
            key={topic}
            containerElement="li"
            className="practice__form--topic__item"
            label={{ text: titlize(topic), visible: true }}
            input={{ type: "checkbox", variant: "tab" }}
            name="topics"
            value={topic}
            checked={selectedTopics.includes(topic)}
            onChange={(event) => handleTopicChange(topic, event.target.checked)}
          />
        ))}
      </ul>

      {error ? <p className="form__field--error">{error}</p> : null}
    </FormFieldset>
  );
};

export default PracticeSettingTopicSection;
