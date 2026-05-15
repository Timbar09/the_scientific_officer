import type { ReactNode } from "react";

import { RadioButton } from "./FormRadioSet";

import type { FormFieldData, FormFieldsetData } from "./types";

export const FormField = ({
  input = { type: "radio", variant: "default" },
  containerElement = "div",
  name,
  value,
  checked,
  onChange,
}: FormFieldData) => {
  const Container = containerElement;

  return (
    <Container className="form__field">
      <RadioButton
        input={input}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
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

export const Form = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="form__container">
      <form action="">{children}</form>
    </div>
  );
};
