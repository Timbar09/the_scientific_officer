import type { FormFieldData } from "./types";

const FormInputBox = ({
  id,
  input = { type: "text", variant: "default" },
  name,
  label,
  placeholder = "",
}: FormFieldData) => {
  const { type, variant } = input;

  const labelVariantClass = `form__input--item form__input--${variant}__item`;
  const inputVariantClass = `form__input--${variant}__item--input`;
  const labelVariantTextClass = label?.visible
    ? "form__field--label p-block-2"
    : "sr-only";

  return (
    <label key={id} className={labelVariantClass}>
      <span className={labelVariantTextClass}>{label?.text}</span>

      <input
        className={`form__input--item__input ${inputVariantClass}`}
        type={type}
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormInputBox;
