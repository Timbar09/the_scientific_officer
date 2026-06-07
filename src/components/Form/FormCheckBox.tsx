import { useEffect, useState } from "react";

import type { FormFieldData } from "@/components/Form/types";

const FormCheckBox = ({
  input = { type: "checkbox", variant: "switch" },
  label = { text: "", visible: false, alignment: "column" },
  name,
  value,
  checked,
  onChange,
}: FormFieldData) => {
  const [isChecked, setIsChecked] = useState(checked || false);
  const { variant } = input;
  const { text, visible } = label;

  label.alignment = label.alignment || "column";

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const checkboxFlexClass =
    label.alignment === "column" ? "flex-col" : "flex-row ai-center";
  const checkboxClass = `form__checkbox flex gap-2 ${checkboxFlexClass} ${isChecked ? "form__checkbox--checked" : ""}`;

  const labelClass = visible ? "form__field--label" : "sr-only";

  const inputVariantClass = `form__checkbox--${variant}__input`;
  const boxVariantClass = `form__checkbox--box form__checkbox--${variant}__box`;
  const indicatorVariantClass = `form__checkbox--${variant}__box--indicator`;

  return (
    <label className={checkboxClass} aria-checked={isChecked}>
      {variant !== "tab" && <span className={labelClass}>{text}</span>}

      <input
        className={`form__checkbox--input ${inputVariantClass}`}
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleOnChange}
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
