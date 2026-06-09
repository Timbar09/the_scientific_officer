import { Controller, useForm } from "react-hook-form";

import Button from "../../../components/Button";
import { Form } from "../../../components/Form";
import { usePracticeSettings } from "../../../hooks/usePracticeSettings";

import PracticeSettingTimerOption from "./PracticeSettingTimerOption";
import PracticeSettingHintOption from "./PracticeSettingHintOption";
import PracticeSettingTopicSection from "./PracticeSettingTopicSection";
import PracticeSettingQuestionTypeSelection from "./PracticeSettingQuestionTypeSelection";

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

export interface PracticeFormFields {
  topics: string[];
  questionType: string;
  timerEnabled: boolean;
  timerValue: number;
  hintsEnabled: boolean;
}

const PracticeSettingsForm = () => {
  const { handleSubmit: submitPracticeSettings, practiceTopics } =
    usePracticeSettings();

  const {
    control,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<PracticeFormFields>({
    defaultValues: {
      topics: [],
      questionType: "all",
      timerEnabled: false,
      timerValue: 5,
      hintsEnabled: false,
    },
  });

  const onSubmit = handleFormSubmit((formValues) => {
    submitPracticeSettings(formValues);
  });

  return (
    <Form
      className="practice__form flex flex-col m-block-start-5"
      onSubmit={onSubmit}
    >
      <FormSection className="practice__form--topic">
        <Controller
          name="topics"
          control={control}
          rules={{
            validate: (topics) =>
              topics.length > 0 || "Select at least one topic",
          }}
          render={({ field }) => (
            <PracticeSettingTopicSection
              selectedTopics={field.value ?? []}
              onTopicsChange={field.onChange}
              error={errors.topics?.message}
              practiceTopics={practiceTopics}
            />
          )}
        />
      </FormSection>

      <div className="practice__form--group flex flex-wrap gap-3">
        <FormSection className="practice__form--questionType">
          <Controller
            name="questionType"
            control={control}
            render={({ field }) => (
              <PracticeSettingQuestionTypeSelection
                selectedQuestionType={field.value}
                onQuestionTypeChange={field.onChange}
              />
            )}
          />
        </FormSection>

        <FormSection className="practice__form--timer">
          <Controller
            name="timerEnabled"
            control={control}
            render={({ field: timerEnabledField }) => (
              <Controller
                name="timerValue"
                control={control}
                render={({ field: timerValueField }) => (
                  <PracticeSettingTimerOption
                    enabled={timerEnabledField.value}
                    onEnabledChange={timerEnabledField.onChange}
                    value={timerValueField.value}
                    onValueChange={timerValueField.onChange}
                  />
                )}
              />
            )}
          />
        </FormSection>

        <FormSection className="practice__form--hints">
          <Controller
            name="hintsEnabled"
            control={control}
            render={({ field }) => (
              <PracticeSettingHintOption
                enabled={field.value}
                onEnabledChange={field.onChange}
              />
            )}
          />
        </FormSection>

        <FormSection className="practice__form--submit flex ai-center">
          <Button type="submit">Start Practice Session</Button>
        </FormSection>
      </div>
    </Form>
  );
};

export default PracticeSettingsForm;
