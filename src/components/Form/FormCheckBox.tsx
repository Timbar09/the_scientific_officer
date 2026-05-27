import { useState } from "react";

import type { FormFieldData } from "@/components/Form/types";

const FormCheckBox = ({
  input = { type: "checkbox", variant: "switch" },
  label = { text: "", visible: false },
  name,
  value,
  onChange,
}: FormFieldData) => {
  const [isChecked, setIsChecked] = useState(false);
  const { variant } = input;
  const { text, visible } = label;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    onChange?.(e);
  };

  const inputVariantClass = `form__checkbox--${variant}__input`;
  const boxVariantClass = `form__checkbox--box form__checkbox--${variant}__box`;
  const indicatorVariantClass = `form__checkbox--${variant}__box--indicator`;

  return (
    <label
      className={`form__checkbox ${isChecked ? "form__checkbox--checked" : ""}`}
    >
      <span className={`form__field--label ${visible ? "" : "sr-only"}`}>
        {text}
      </span>

      <input
        className={`form__checkbox--input ${inputVariantClass}`}
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleOnChange}
      />

      <span
        className={`${boxVariantClass} ${visible ? "m-block-start-1" : ""}`}
      >
        <span className={indicatorVariantClass}></span>
      </span>
    </label>
  );
};

export default FormCheckBox;
