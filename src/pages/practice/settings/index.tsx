import Button from "@/components/Button";

import PracticeSettingTimerOption from "./PracticeSettingTimerOption";
import PracticeSettingHintOption from "./PracticeSettingHintOption";
import PracticeSettingTopicSection from "./PracticeSettingTopicSection";
import PracticeSettingQuestionTypeSelection from "./PracticeSettingQuestionTypeSelection";

import { usePracticeSettings } from "@hooks/usePracticeSettings";

const PracticeSettingsForm = () => {
  const { handleSubmit } = usePracticeSettings();

  return (
    <form className="practice__form m-block-start-5" onSubmit={handleSubmit}>
      <PracticeSettingTopicSection />

      <PracticeSettingQuestionTypeSelection />

      <PracticeSettingHintOption />

      <PracticeSettingTimerOption />

      <div className="btn btn--primary m-block-start-4">
        <Button type="submit">Start Practicing</Button>
      </div>
    </form>
  );
};

export default PracticeSettingsForm;
