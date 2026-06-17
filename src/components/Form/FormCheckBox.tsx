import type { FormFieldData } from "./types";

const FormCheckBox = ({
  input = { type: "checkbox", variant: "switch" },
  label = { text: "", visible: false, alignment: "column" },
  name,
  value,
  isChecked,
  disabled = false,
  register,
  rules,
}: FormFieldData) => {
  const { variant } = input;
  const { text, visible } = label;

  label.alignment = label.alignment || "column";

  const isAlignRow = label.alignment === "row";

  const isCheckedClass = isChecked ? "form__checkbox--checked" : "";
  const checkboxFlexClass = isAlignRow ? "flex-row ai-center" : "flex-col";
  const checkboxClass = `form__checkbox flex gap-2 ${checkboxFlexClass} ${isCheckedClass}`;

  const labelClass = visible ? "form__field--label" : "sr-only";

  const inputVariantClass = `form__checkbox--${variant}__input`;
  const boxVariantClass = `form__checkbox--box form__checkbox--${variant}__box`;
  const indicatorVariantClass = `form__checkbox--${variant}__box--indicator`;

  const isRHF = register && name;

  const rhfProps = isRHF
    ? register(name, {
        ...rules,
      })
    : {};

  return (
    <label className={checkboxClass} aria-checked={isChecked}>
      {variant !== "tab" && <span className={labelClass}>{text}</span>}

      <input
        className={`form__checkbox--input ${inputVariantClass}`}
        type="checkbox"
        name={name}
        value={value ? value.toString() : "on"}
        disabled={disabled}
        {...rhfProps}
      />

      <span className={boxVariantClass}>
        {variant === "tab" ? (
          text
        ) : (
          <span className={indicatorVariantClass}></span>
        )}
      </span>
    </label>
  );
};

export default FormCheckBox;
