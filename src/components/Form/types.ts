export interface InputData {
  type: "text" | "radio" | "checkbox";
  variant: string;
}

export interface FormFieldData {
  id?: number;
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
  children: React.ReactNode;
  legend: LegendData;
}
