import type { FormFieldsetData } from "./types";

const FormFieldset = ({
  children,
  className = "",
  legend = { label: "", visible: true },
}: FormFieldsetData) => {
  const legendClass = legend.visible ? "form__fieldset--legend" : "sr-only";
  const fieldsetClass = `form__fieldset ${className == "" ? "p-block-2 p-inline-3 m-block-start-2" : className}`;
  return (
    <fieldset className={fieldsetClass}>
      <legend className={legendClass}>{legend.label}</legend>
      {children}
    </fieldset>
  );
};

export default FormFieldset;
