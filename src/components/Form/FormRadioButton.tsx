import { useEffect, useRef, useState } from "react";

import FormFieldset from "./FormFieldSet";

import type { RADIO_VARIANT, FormFieldData } from "./types";

import { titlize } from "../../utils";

const FormRadioButton = ({
  label = { text: "", visible: true },
  name,
  className = "",
  input = { type: "radio", variant: "default" },
  options = [],
  register,
  rules,
}: FormFieldData) => {
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });
  const [activeRadio, setActiveRadio] = useState(
    options.find((option) => option.checked)?.id || options[0]?.id || 0,
  );
  const { variant } = input;

  const variantClasses = {
    default: "form__radio--default__list flex flex-col gap-2",
    rail: "form__radio--rail__list flex",
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
                name={name}
                value={option.value}
                checked={option.checked}
                disabled={option.disabled}
                onChange={option.onChange}
                setRadioSliderStyle={setSliderStyle}
                activeRadio={activeRadio}
                setActiveRadio={setActiveRadio}
                register={register}
                rules={rules}
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

const RadioButtonOption = ({
  id,
  input = { type: "radio", variant: "default" },
  name,
  value,
  disabled = false,
  onChange,
  setRadioSliderStyle,
  activeRadio,
  setActiveRadio,
  register,
  rules,
}: FormFieldData) => {
  const radioRef = useRef<HTMLLabelElement>(null);

  const { variant } = input;

  const isSliderActive = variant !== "default" && id === activeRadio;

  useEffect(() => {
    if (isSliderActive && radioRef.current) {
      setRadioSliderStyle?.({
        left: `${radioRef.current.offsetLeft}px`,
        width: `${radioRef.current.clientWidth}px`,
      });
    }
  }, [isSliderActive, setRadioSliderStyle]);

  const isActive = activeRadio === id;

  const inputVariantClass = `form__radio--${variant}__item--input`;

  const activeClass = isActive ? `form__radio--${variant}__active` : "";
  const labelVariantClass = `form__radio--${variant}__item ${activeClass}`;

  const contentVariantClass = `form__radio--${variant}__item--content p-block-2 p-inline-3`;
  const contentLabelVariantClass = `form__radio--${variant}__item--content__label`;

  const isRHF = register && name;

  const rhfProps = isRHF
    ? register(name, {
        ...rules,
      })
    : {};

  return (
    <label
      ref={variant !== "default" ? radioRef : null}
      key={id}
      className={`form__radio--item ${labelVariantClass}`}
      onClick={() => setActiveRadio?.(id || 0)}
    >
      <input
        className={`form__radio--item__input ${inputVariantClass}`}
        type="radio"
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...rhfProps}
      />

      <span className={`form__radio--item__content ${contentVariantClass}`}>
        <span className={contentLabelVariantClass}>{titlize(value || "")}</span>
      </span>
    </label>
  );
};

export default FormRadioButton;
