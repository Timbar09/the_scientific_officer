import FormTextArea from "./FormTextArea";
import FormCheckBox from "./FormCheckBox";
import FormInputBox from "./FormInputBox";
import FormRadioButton from "./FormRadioButton";

import type {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

export type INPUT_TYPE = "text" | "radio" | "checkbox" | "textarea";
export type RADIO_VARIANT = "default" | "rail";
export type CHECKBOX_VARIANT = "default" | "switch" | "tab";

export type InputComponent =
  | typeof FormInputBox
  | typeof FormRadioButton
  | typeof FormTextArea
  | typeof FormCheckBox;

export interface InputData {
  type: INPUT_TYPE;
  variant: string;
}

export interface FormFieldData {
  id: number;
  className?: string;
  input?: InputData;
  containerElement?: "div" | "li";
  label?: FormLabelData;
  name?: string;
  value?: string;
  checked?: boolean;
  isChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  rows?: number;
  placeholder?: string;
  register?: UseFormRegister<FieldValues>;
  rules?: RegisterOptions<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRadioSliderStyle?: (style: { left: string; width: string }) => void;
  activeRadio?: number;
  setActiveRadio?: (id: number) => void;
  options?: FormFieldData[];
}

export interface FormLabelData {
  text: string;
  visible: boolean;
  alignment?: "row" | "column";
}

export interface FormFieldsetData {
  label: FormLabelData;
  children: React.ReactNode;
  className?: string;
}
