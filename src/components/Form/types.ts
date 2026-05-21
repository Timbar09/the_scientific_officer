import FormInputBox from "./FormInputBox";
import FormRadioButton from "./FormRadioButton";
import type FormTextArea from "./FormTextArea";

export type InputComponent =
  | typeof FormInputBox
  | typeof FormRadioButton
  | typeof FormTextArea;
export interface InputData {
  type: "text" | "radio" | "checkbox" | "textarea";
  variant: string;
}

export interface FormFieldData {
  id?: number;
  className?: string;
  input?: InputData;
  containerElement?: "div" | "li";
  label?: { text: string; visible: boolean };
  name: string;
  value?: string;
  checked?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRadioSliderStyle?: (style: { left: string; width: string }) => void;
  activeRadio?: number;
  setActiveRadio?: (id: number) => void;
}

export interface LabelData {
  text: string;
  visible: boolean;
}

export interface FormFieldsetData {
  label: LabelData;
  children: React.ReactNode;
  className?: string;
}

export interface FormRadioSetData {
  label: LabelData;
  className?: string;
  variant?: "default" | "rail" | "ball";
  data: FormFieldData[];
}
