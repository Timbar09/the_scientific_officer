import { useEffect, useRef, useState } from "react";

import { FormFieldset, FormField } from ".";

import type { LegendData, FormFieldData } from "./types";

export const RadioButton = ({
  id,
  input = { type: "radio", variant: "default" },
  name,
  value,
  checked,
  onChange,
  setRadioSliderStyle,
  activeRadio = 0,
  setActiveRadio,
}: FormFieldData) => {
  const radioRef = useRef<HTMLLabelElement>(null);

  const { variant } = input;

  useEffect(() => {
    if (variant !== "default" && radioRef.current && id === activeRadio) {
      setRadioSliderStyle?.({
        left: `${radioRef.current.offsetLeft}px`,
        width: `${radioRef.current.clientWidth}px`,
      });
    }
  }, [activeRadio, setRadioSliderStyle, id, variant, value]);

  const labelVariantClass = `form__radio--item form__radio--${variant}__item`;
  const inputVariantClass = `form__radio--${variant}__item--input`;
  const contentVariantClass = `form__radio--item__content form__radio--${variant}__item--content`;
  const contentLabelVariantClass = `form__radio--${variant}__item--content__label`;

  const inputAttributes =
    variant == "default"
      ? {
          checked: checked,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(event),
        }
      : { defaultChecked: id == activeRadio };

  return (
    <label
      ref={variant !== "default" ? radioRef : null}
      key={id}
      className={labelVariantClass}
      onClick={() => setActiveRadio?.(id || 0)}
    >
      <input
        className={`form__radio--item__input ${inputVariantClass}`}
        type="radio"
        name={name}
        value={value}
        {...inputAttributes}
      />

      <span className={`${contentVariantClass}`}>
        <span className={contentLabelVariantClass}>{value}</span>
      </span>
    </label>
  );
};

const FormRadioSet = ({
  legend,
  variant = "default",
  data,
}: {
  legend: LegendData;
  variant?: "default" | "rail" | "ball";
  data: FormFieldData[];
}) => {
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });
  const [activeRadio, setActiveRadio] = useState(0);

  const variantClasses = {
    default: "form__radio--default__list flex flex-col gap-2",
    rail: "form__radio--rail__list flex",
    ball: "form__radio--ball__list",
  };
  const variantClass = variantClasses[variant];

  return (
    <FormFieldset legend={legend}>
      <div
        className={`form__radio--container form__radio--${variant}__container`}
      >
        <ul className={`form__radio--list ${variantClass}`}>
          {data.map((fieldData) => (
            <FormField
              key={fieldData.value}
              id={fieldData.id}
              input={{ type: "radio", variant }}
              containerElement="li"
              name={fieldData.name}
              value={fieldData.value}
              checked={fieldData.checked}
              onChange={fieldData.onChange}
              setRadioSliderStyle={setSliderStyle}
              activeRadio={activeRadio}
              setActiveRadio={setActiveRadio}
            />
          ))}

          <div className="form__radio--slider" style={sliderStyle}></div>
        </ul>
      </div>
    </FormFieldset>
  );
};

export default FormRadioSet;
