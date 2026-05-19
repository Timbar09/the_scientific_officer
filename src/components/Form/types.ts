export interface InputData {
  type: "text" | "radio" | "checkbox";
  variant: string;
}

export interface FormFieldData {
  id?: number;
  className?: string;
  input?: InputData;
  containerElement?: "div" | "li";
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRadioSliderStyle?: (style: { left: string; width: string }) => void;
  activeRadio?: number;
  setActiveRadio?: (id: number) => void;
}

export interface LegendData {
  label: string;
  visible: boolean;
}

export interface FormFieldsetData {
  legend: LegendData;
  children: React.ReactNode;
  className?: string;
}

export interface FormRadioSetData {
  legend: LegendData;
  className?: string;
  variant?: "default" | "rail" | "ball";
  data: FormFieldData[];
}
