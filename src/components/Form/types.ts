export interface InputData {
  type: "text" | "radio" | "checkbox";
  variant: string;
}

export interface FormFieldData {
  input?: InputData;
  containerElement?: "div" | "li";
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LegendData {
  label: string;
  visible: boolean;
}

export interface FormFieldsetData {
  children: React.ReactNode;
  legend: LegendData;
}
