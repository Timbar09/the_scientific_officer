import type { FormFieldsetData } from "./types";

const FormFieldset = ({
  children,
  className = "",
  label = { text: "", visible: true },
}: FormFieldsetData) => {
  const legendClass = label.visible ? "form__field--label" : "sr-only";
  const fieldsetClass = `form__fieldset ${className == "" ? "p-block-2 p-inline-3 m-block-start-2" : className}`;

  return (
    <fieldset className={fieldsetClass}>
      <legend className={legendClass}>{label.text}</legend>
      {children}
    </fieldset>
  );
};

export default FormFieldset;
