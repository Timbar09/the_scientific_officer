import type { ReactNode } from "react";

import FormRadioSet, { RadioButton } from "./FormRadioSet";

import type { FormFieldData, FormFieldsetData } from "./types";

export const FormField = ({
  id,
  input = { type: "radio", variant: "default" },
  containerElement = "div",
  name,
  value,
  checked,
  onChange,
  setRadioSliderStyle,
  activeRadio,
  setActiveRadio,
}: FormFieldData) => {
  const Container = containerElement;

  return (
    <Container className="form__field">
      <RadioButton
        id={id}
        input={input}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        setRadioSliderStyle={setRadioSliderStyle}
        activeRadio={activeRadio}
        setActiveRadio={setActiveRadio}
      />
    </Container>
  );
};

export const FormFieldset = ({
  children,
  legend = { label: "", visible: true },
}: FormFieldsetData) => {
  const legendClass = legend.visible ? "form__fieldset--legend" : "sr-only";
  return (
    <fieldset className="form__fieldset">
      <legend className={legendClass}>{legend.label}</legend>
      {children}
    </fieldset>
  );
};

export const Form = ({
  children,
  onSubmit,
}: {
  children?: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__container">{children}</div>
    </form>
  );
};

export default { Form, FormFieldset, FormField, FormRadioSet };
