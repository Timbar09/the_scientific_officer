import type { FormFieldData } from "./types";

const FormInputBox = ({
  id,
  input = { type: "text", variant: "default" },
  name,
  label,
  placeholder = "",
  disabled = false,
  required = false,
  autoComplete,
  maxLength,
  min,
  max,
  register,
  rules,
}: FormFieldData) => {
  const { type, variant } = input;

  const isRHF = register && name;

  const rhfProps = isRHF
    ? register(name, {
        ...rules,
      })
    : {};

  const inputVariantClass = `form__input--${variant}__item--input`;
  const labelVariantClass = `form__input--item form__input--${variant}__item`;
  const labelVariantTextClass = label?.visible
    ? "form__field--label m-block-end-2"
    : "sr-only";

  return (
    <label key={id} className={labelVariantClass}>
      <span className={labelVariantTextClass}>{label?.text}</span>

      <input
        className={`form__input--item__input ${inputVariantClass} p-block-2 p-inline-4`}
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        maxLength={maxLength}
        min={min}
        max={max}
        {...rhfProps}
      />
    </label>
  );
};

export default FormInputBox;
