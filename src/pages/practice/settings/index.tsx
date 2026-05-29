import Button from "@/components/Button";
import { Form } from "@/components/Form";

import PracticeSettingTimerOption from "./PracticeSettingTimerOption";
import PracticeSettingHintOption from "./PracticeSettingHintOption";
import PracticeSettingTopicSection from "./PracticeSettingTopicSection";
import PracticeSettingQuestionTypeSelection from "./PracticeSettingQuestionTypeSelection";

import { usePracticeSettings } from "@hooks/usePracticeSettings";

interface FormSectionProps {
  className: string;
  children: React.ReactNode;
}

const FormSection = ({ className, children }: FormSectionProps) => {
  return (
    <section className={`practice__form--section ${className} p-5`}>
      {children}
    </section>
  );
};

const PracticeSettingsForm = () => {
  const { handleSubmit } = usePracticeSettings();

  return (
    <Form
      className="practice__form flex flex-col m-block-start-5"
      onSubmit={handleSubmit}
    >
      <FormSection className="practice__form--topic">
        <PracticeSettingTopicSection />
      </FormSection>

      <div className="practice__form--group flex flex-wrap gap-3">
        <FormSection className="practice__form--questionType">
          <PracticeSettingQuestionTypeSelection />
        </FormSection>

        <FormSection className="practice__form--timer">
          <PracticeSettingTimerOption />
        </FormSection>

        <FormSection className="practice__form--hints">
          <PracticeSettingHintOption />
        </FormSection>

        <section className="practice__form--submit">
          <Button type="submit">Start Practice Session</Button>
        </section>
      </div>
    </Form>
  );
};

export default PracticeSettingsForm;
