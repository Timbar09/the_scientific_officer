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
  register,
  rules,
}: FormFieldData) => {
  const { variant } = input;

  const isRHF = register && name;

  const rhfProps = isRHF
    ? register(name, {
        ...rules,
      })
    : {};

  const labelVariantClass = `form__input--${variant}__item`;
  const inputVariantClass = `form__input--${variant}__item--input`;
  const labelTextClass = label?.visible
    ? "form__field--label m-block-end-2"
    : "sr-only";

  return (
    <label key={id} className={`form__input--item ${labelVariantClass}`}>
      <span className={labelTextClass}>{label?.text}</span>

      <textarea
        className={`form__input--item__input textarea ${inputVariantClass} p-block-2 p-inline-4`}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        {...rhfProps}
      />
    </label>
  );
};

export default FormTextArea;
