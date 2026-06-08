import { useEffect, useRef, useState } from "react";

import { FormField, FormFieldset } from "@/components/Form";

import { usePracticeSettings } from "@/hooks/usePracticeSettings";

import { titlize } from "@/utils";

const PracticeSettingTopicSection = () => {
  const { practiceTopics } = usePracticeSettings();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const initializedDefaultTopic = useRef(false);

  useEffect(() => {
    if (!initializedDefaultTopic.current && practiceTopics.length > 0) {
      initializedDefaultTopic.current = true;
      setSelectedTopics([practiceTopics[0]]);
    }
  }, [practiceTopics]);

  const isSelectAllChecked =
    practiceTopics.length > 0 &&
    selectedTopics.length === practiceTopics.length;

  const handleSelectAllChange = (checked: boolean) => {
    setSelectedTopics(checked ? [...practiceTopics] : []);
  };

  const handleTopicChange = (topic: string, checked: boolean) => {
    setSelectedTopics((currentTopics) =>
      checked
        ? Array.from(new Set([...currentTopics, topic]))
        : currentTopics.filter((currentTopic) => currentTopic !== topic),
    );
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
            name="topic"
            value={topic}
            checked={selectedTopics.includes(topic)}
            onChange={(event) => handleTopicChange(topic, event.target.checked)}
          />
        ))}
      </ul>
    </FormFieldset>
  );
};

export default PracticeSettingTopicSection;
