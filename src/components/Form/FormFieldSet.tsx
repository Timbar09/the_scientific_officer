import type { FormFieldsetData } from "./types";

const FormFieldset = ({
  children,
  className = "",
  label = { text: "", visible: true },
}: FormFieldsetData) => {
  const legendClass = label.visible
    ? "form__field--label m-block-end-2"
    : "sr-only";
  const fieldsetClass = `form__fieldset ${className}`;

  return (
    <fieldset className={fieldsetClass}>
      <legend className={legendClass}>{label.text}</legend>
      {children}
    </fieldset>
  );
};

export default FormFieldset;
