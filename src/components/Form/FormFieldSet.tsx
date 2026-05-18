import type { FormFieldsetData } from "./types";

const FormFieldset = ({
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

export default FormFieldset;
