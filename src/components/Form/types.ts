import FormInputBox from "./FormInputBox";
import FormRadioButton from "./FormRadioButton";
import FormTextArea from "./FormTextArea";

export type INPUT_TYPE = "text" | "radio" | "checkbox" | "textarea";
export type RADIO_VARIANT = "default" | "rail" | "ball";

export type InputComponent =
  | typeof FormInputBox
  | typeof FormRadioButton
  | typeof FormTextArea;

export interface InputData {
  type: INPUT_TYPE;
  variant: string;
}

export interface FormFieldData {
  id?: number;
  className?: string;
  input?: InputData;
  containerElement?: "div" | "li";
  label?: { text: string; visible: boolean };
  name?: string;
  value?: string;
  checked?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRadioSliderStyle?: (style: { left: string; width: string }) => void;
  activeRadio?: number;
  setActiveRadio?: (id: number) => void;
  options?: FormFieldData[];
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
