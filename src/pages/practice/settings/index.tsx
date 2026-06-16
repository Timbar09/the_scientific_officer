import { useForm, useWatch } from "react-hook-form";
import { usePracticeSettings } from "../../../hooks/usePracticeSettings";
import type { FieldValues } from "react-hook-form";

import Button from "../../../components/Button";
import { Form } from "../../../components/Form";

import PracticeSettingTimerOption from "./PracticeSettingTimerOption";
import PracticeSettingHintOption from "./PracticeSettingHintOption";
import PracticeSettingTopicSection from "./PracticeSettingTopicSection";
import PracticeSettingQuestionTypeSelection from "./PracticeSettingQuestionTypeSelection";

// FORM DATA
const fd = {
  topics: {
    name: "topics",
    practiceTopics: [] as string[],
    defaultValue: [],
    selected: [] as string[],
    isAllSelected: false,
  },
  qType: {
    name: "questionType",
    defaultValue: "all",
    questionTypes: [] as { id: number; name: string; available: boolean }[],
  },
  timer: {
    name: "timerEnabled",
    defaultValue: false,
    value: "set_timer",
    isTimed: false,
  },
  timerValue: { name: "timerValue" },
  hints: { name: "hintsEnabled", defaultValue: false, hasHints: false },
  allTopics: { name: "selectAllTopics" },
};

interface FormSectionProps {
  className: string;
  children?: React.ReactNode;
}

const PracticeSettingsForm = () => {
  const { handleSubmit, practiceTopics, questionTypes } = usePracticeSettings();

  const {
    control,
    register,
    setValue,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      topics: fd.topics.defaultValue,
      questionType: fd.qType.defaultValue,
      timerEnabled: fd.timer.defaultValue,
      timerValue: 5,
      hintsEnabled: false,
    },
  });

  const selectedTopics = useWatch({ control, name: fd.topics.name }) ?? [];
  const isHintEnabled = useWatch({ control, name: fd.hints.name }) ?? false;
  const isTimerEnabled = useWatch({ control, name: fd.timer.name }) ?? false;
  const isSelectAllChecked =
    useWatch({ control, name: fd.allTopics.name }) ?? false;

  const onSubmit = handleFormSubmit((formValues) => {
    handleSubmit(formValues);
  });

  fd.topics.practiceTopics = practiceTopics;
  fd.topics.selected = selectedTopics;
  fd.topics.isAllSelected = isSelectAllChecked;

  fd.qType.questionTypes = questionTypes;

  fd.timer.isTimed = isTimerEnabled;

  fd.hints.hasHints = isHintEnabled;

  return (
    <Form
      className="practice__form flex flex-col m-block-start-5"
      onSubmit={onSubmit}
    >
      <FormSection className="practice__form--topic">
        <PracticeSettingTopicSection
          register={register}
          error={errors.topics?.message as string}
          formSectionData={fd.topics}
        />
      </FormSection>

      <div className="practice__form--group flex flex-wrap gap-3">
        <FormSection className="practice__form--questionType">
          <PracticeSettingQuestionTypeSelection
            register={register}
            formSectionData={fd.qType}
          />
        </FormSection>

        <FormSection className="practice__form--timer">
          <PracticeSettingTimerOption
            register={register}
            setValue={setValue}
            formSectionData={fd.timer}
          />
        </FormSection>

        <FormSection className="practice__form--hints">
          <PracticeSettingHintOption
            register={register}
            formSectionData={fd.hints}
          />
        </FormSection>

        <FormSection className="practice__form--submit flex ai-center">
          <Button type="submit">Start Practice Session</Button>
        </FormSection>
      </div>
    </Form>
  );
};

const FormSection = ({ className, children }: FormSectionProps) => {
  return (
    <section className={`practice__form--section ${className} p-5`}>
      {children}
    </section>
  );
};

export default PracticeSettingsForm;
