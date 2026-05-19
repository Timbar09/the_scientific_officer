import RadioButton from "./FormRadioButton";

import type { FormFieldData } from "./types";

const FormField = ({
  id,
  className = "",
  input = { type: "radio", variant: "default" },
  containerElement = "div",
  name,
  value,
  checked,
  onChange,
  setRadioSliderStyle,
  activeRadio,
  setActiveRadio,
}: FormFieldData) => {
  const Container = containerElement;

  return (
    <Container className={`form__field ${className}`}>
      <RadioButton
        id={id}
        input={input}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        setRadioSliderStyle={setRadioSliderStyle}
        activeRadio={activeRadio}
        setActiveRadio={setActiveRadio}
      />
    </Container>
  );
};

export default FormField;
