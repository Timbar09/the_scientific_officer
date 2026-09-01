import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { usePracticeSettings } from "../../../hooks/usePracticeSettings";
import type { FieldValues } from "react-hook-form";

import Button from "../../../components/Button";
import { Form } from "../../../components/Form";

import PracticeSettingTimerOption from "./PracticeSettingTimerOption";
import PracticeSettingHintOption from "./PracticeSettingHintOption";
import PracticeSettingTopicSection from "./PracticeSettingTopicSection";
import PracticeSettingQuestionTypeSelection from "./PracticeSettingQuestionTypeSelection";

const BASE_CN = "practice__form";

// FORM DATA
const fd = {
  topics: {
    name: "topics",
    practiceTopics: [] as string[],
    defaultValue: [],
    selected: [] as string[],
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
  hasError?: boolean;
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

  const submit = handleFormSubmit((formValues) => {
    handleSubmit(formValues);
  });

  fd.topics.practiceTopics = practiceTopics;
  fd.topics.selected = selectedTopics;

  fd.qType.questionTypes = questionTypes;

  fd.timer.isTimed = isTimerEnabled;

  fd.hints.hasHints = isHintEnabled;

  const layoutClassName = "flex flex-col m-block-start-5";

  const hasErrors = !!errors.topics?.message && selectedTopics.length === 0;

  return (
    <Form className={`${BASE_CN} ${layoutClassName}`} submit={submit}>
      <FormSection className={`${BASE_CN}--topic`} hasError={hasErrors}>
        <PracticeSettingTopicSection
          register={register}
          setValue={setValue}
          errorMessage={errors.topics?.message as string}
          formSectionData={fd.topics}
        />
      </FormSection>

      <div className={`${BASE_CN}--group flex flex-wrap gap-3`}>
        <FormSection className={`${BASE_CN}--questionType`}>
          <PracticeSettingQuestionTypeSelection
            register={register}
            formSectionData={fd.qType}
          />
        </FormSection>

        <FormSection className={`${BASE_CN}--timer`}>
          <PracticeSettingTimerOption
            register={register}
            setValue={setValue}
            formSectionData={fd.timer}
          />
        </FormSection>

        <FormSection className={`${BASE_CN}--hints`}>
          <PracticeSettingHintOption
            register={register}
            setValue={setValue}
            formSectionData={fd.hints}
          />
        </FormSection>

        <FormSection className={`${BASE_CN}--submit flex ai-center`}>
          <Button type="submit">Start Practice Session</Button>
        </FormSection>
      </div>
    </Form>
  );
};

const FormSection = ({ className, children, hasError }: FormSectionProps) => {
  const errorClass = hasError ? "form__field--error" : "";
  const classNames = `${BASE_CN}--section ${className} ${errorClass} p-5`;

  return <section className={classNames}>{children}</section>;
};

export default PracticeSettingsForm;
