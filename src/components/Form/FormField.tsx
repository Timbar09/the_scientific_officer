import TextArea from "./FormTextArea";
import InputBox from "./FormInputBox";
import FormCheckBox from "./FormCheckBox";
import RadioButton from "./FormRadioButton";

import type { InputComponent, FormFieldData } from "./types";

// TODO: Can I make sure some props are not required based on the input type? For example, options should only be required for radio buttons and checkboxes, but not for text inputs or textareas. I think this is possible with conditional types, but I need to research it more.
const FormField = ({
  id,
  className = "",
  input = { type: "text", variant: "default" },
  containerElement = "div",
  label = { text: "", visible: true, alignment: "column" },
  name = "",
  value = "",
  checked,
  disabled = false,
  autoComplete,
  rows,
  placeholder = "",
  register,
  rules,
  errors,
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
        disabled={disabled}
        autoComplete={autoComplete}
        rows={rows}
        placeholder={placeholder}
        register={register}
        rules={rules}
        onChange={onChange}
        setRadioSliderStyle={setRadioSliderStyle}
        activeRadio={activeRadio}
        setActiveRadio={setActiveRadio}
        options={options}
      />

      {errors && errors[name] && (
        <p className="form__field--error p-block-1 p-inline-4 clr-alert-800">
          {errors[name]?.message?.toString() || "This field is required."}
        </p>
      )}
    </Container>
  );
};

export default FormField;
