import { useEffect, useRef, useState } from "react";

import FormFieldset from "./FormFieldSet";

import type { RADIO_VARIANT, FormFieldData } from "./types";

import { titlize } from "../../utils";

export const DEFAULT_ACTIVE_RADIO = 999;

const RadioButtonOption = ({
  id,
  input = { type: "radio", variant: "default" },
  name,
  value,
  checked,
  disabled = false,
  required = false,
  onChange,
  setRadioSliderStyle,
  activeRadio = DEFAULT_ACTIVE_RADIO,
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
  const contentVariantClass = `form__radio--item__content form__radio--${variant}__item--content p-block-2 p-inline-3`;
  const contentLabelVariantClass = `form__radio--${variant}__item--content__label`;

  const inputAttributes =
    variant == "default"
      ? {
          checked: checked,
          disabled,
          required,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(event),
        }
      : {
          checked: checked,
          disabled,
          required,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.(event),
        };

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
        <span className={contentLabelVariantClass}>{titlize(value || "")}</span>
      </span>
    </label>
  );
};

const FormRadioButton = ({
  label = { text: "", visible: true },
  className = "",
  input = { type: "radio", variant: "default" },
  options = [],
}: FormFieldData) => {
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });
  const [activeRadio, setActiveRadio] = useState(999);
  const { variant } = input;

  const variantClasses = {
    default: "form__radio--default__list flex flex-col gap-2",
    rail: "form__radio--rail__list flex",
    ball: "form__radio--ball__list",
  };
  const variantClass = variantClasses[variant as RADIO_VARIANT] || "";

  return (
    <FormFieldset label={label} className={className}>
      <div
        className={`form__radio--container form__radio--${variant}__container`}
      >
        <ul className={`form__radio--list ${variantClass}`}>
          {options.map((option) => (
            <li
              key={option.id}
              className={`form__radio--${variant}__item--container`}
              role="listitem"
            >
              <RadioButtonOption
                id={option.id}
                input={input}
                containerElement="li"
                name={option.name}
                value={option.value}
                checked={option.checked}
                disabled={option.disabled}
                required={option.required}
                onChange={option.onChange}
                setRadioSliderStyle={setSliderStyle}
                activeRadio={activeRadio}
                setActiveRadio={setActiveRadio}
              />
            </li>
          ))}

          {variant == "rail" && (
            <div className="form__radio--slider" style={sliderStyle}></div>
          )}
        </ul>
      </div>
    </FormFieldset>
  );
};

export default FormRadioButton;
