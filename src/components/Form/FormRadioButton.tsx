import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import FormFieldset from "./FormFieldSet";

import type { RADIO_VARIANT, FormFieldData } from "./types";

const FormRadioButton = ({
  label = { text: "", visible: true },
  name,
  className = "",
  input = { type: "radio", variant: "default" },
  options = [],
  numberOptions,
  isChecked = false,
  register,
  rules,
  activeRadio,
  setActiveRadio,
}: FormFieldData) => {
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });

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
                className={option.className}
                input={input}
                containerElement="li"
                name={name}
                label={option.label}
                value={option.value}
                checked={option.checked}
                disabled={option.disabled}
                onChange={option.onChange}
                numberOptions={numberOptions}
                optionCorrectText={option.optionCorrectText}
                setRadioSliderStyle={setSliderStyle}
                activeRadio={activeRadio}
                setActiveRadio={setActiveRadio}
                isChecked={isChecked}
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
  className = "",
  input = { type: "radio", variant: "default" },
  label,
  name,
  value,
  disabled = false,
  onChange,
  numberOptions,
  optionCorrectText,
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
  const contentLabelVariantClass = `form__radio--${variant}__item--content__label flex flex-col gap-1`;

  const isRHF = register && name;

  const rhfProps = isRHF
    ? register(name, {
        ...rules,
      })
    : undefined;

  const { onChange: rhfOnChange, ...inputProps } = rhfProps ?? {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    rhfOnChange?.(event);

    if (onChange) {
      onChange(event);
    }

    if (setActiveRadio) {
      setActiveRadio(id);
    }
  };

  const hasLabel = label && label.text && label.visible;

  const letter = numberOptions ? String.fromCharCode(65 + id) : null;

  const animationProps = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    transition: {
      duration: 0.35,
      opacity: { delay: 0.15, duration: 0.2 },
    },
  };

  return (
    <label
      ref={variant !== "default" ? radioRef : null}
      key={id}
      className={`form__radio--item ${labelVariantClass} ${className}`}
    >
      <input
        className={`form__radio--item__input ${inputVariantClass}`}
        type="radio"
        value={value}
        disabled={disabled}
        {...inputProps}
        onChange={handleChange}
        checked={isActive}
      />

      <span className={`form__radio--item__content ${contentVariantClass}`}>
        <span className={contentLabelVariantClass}>
          <span>
            {letter && (
              <span className="form__radio--item__content__letter m-inline-end-1">
                {letter}.
              </span>
            )}
            {hasLabel ? label.text : value}
          </span>

          <AnimatePresence initial={false}>
            {optionCorrectText && (
              <motion.span
                {...animationProps}
                className="form__radio--item__content__correct-text fw-regular p-inline-start-4"
              >
                Correct! {optionCorrectText}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </span>
    </label>
  );
};

export default FormRadioButton;
