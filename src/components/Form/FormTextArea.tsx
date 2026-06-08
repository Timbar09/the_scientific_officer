import type { FormFieldData } from "./types";

const FormTextArea = ({
  id,
  input = { type: "textarea", variant: "default" },
  name,
  label,
  placeholder = "",
  disabled = false,
  required = false,
  rows,
}: FormFieldData) => {
  const { variant } = input;

  const labelVariantClass = `form__input--item form__input--${variant}__item`;
  const inputVariantClass = `form__input--${variant}__item--input`;
  const labelVariantTextClass = label?.visible
    ? "form__field--label m-block-end-2"
    : "sr-only";

  return (
    <label key={id} className={labelVariantClass}>
      <span className={labelVariantTextClass}>{label?.text}</span>

      <textarea
        className={`form__input--item__input textarea ${inputVariantClass} p-block-2 p-inline-4`}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
      />
    </label>
  );
};

export default FormTextArea;
