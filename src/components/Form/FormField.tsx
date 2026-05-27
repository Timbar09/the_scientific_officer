import TextArea from "./FormTextArea";
import InputBox from "./FormInputBox";
import FormCheckBox from "./FormCheckBox";
import RadioButton from "./FormRadioButton";

import type { InputComponent, FormFieldData } from "./types";

const FormField = ({
  id,
  className = "",
  input = { type: "text", variant: "default" },
  containerElement = "div",
  label = { text: "", visible: true },
  name = "",
  value = "",
  checked = false,
  placeholder = "",
  onChange = () => {},
  setRadioSliderStyle,
  activeRadio,
  setActiveRadio,
  options = [],
}: FormFieldData) => {
  const { type } = input;
  const Container = containerElement;

  const inputs: Record<string, InputComponent> = {
    text: InputBox,
    radio: RadioButton,
    textarea: TextArea,
    checkbox: FormCheckBox,
  };

  const Input = inputs[type] || InputBox;

  return (
    <Container className={`form__field ${className}`}>
      <Input
        id={id}
        input={input}
        name={name}
        value={value}
        label={label}
        checked={checked}
        placeholder={placeholder}
        onChange={onChange}
        setRadioSliderStyle={setRadioSliderStyle}
        activeRadio={activeRadio}
        setActiveRadio={setActiveRadio}
        options={options}
      />
    </Container>
  );
};

export default FormField;
