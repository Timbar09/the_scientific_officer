import type { FormFieldData } from "./types";

const FormTextArea = ({
  id,
  input = { type: "textarea", variant: "default" },
  name,
  label,
  placeholder = "",
}: FormFieldData) => {
  const { variant } = input;

  const labelVariantClass = `form__input--item form__input--${variant}__item`;
  const inputVariantClass = `form__input--${variant}__item--input`;
  const labelVariantTextClass = label?.visible
    ? "form__field--label p-block-2"
    : "sr-only";

  return (
    <label key={id} className={labelVariantClass}>
      <span className={labelVariantTextClass}>{label?.text}</span>

      <textarea
        className={`form__input--item__input textarea ${inputVariantClass}`}
        name={name}
        placeholder={placeholder}
      />
    </label>
  );
};

export default FormTextArea;
