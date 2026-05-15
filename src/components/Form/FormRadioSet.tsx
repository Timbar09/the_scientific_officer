import { FormFieldset, FormField } from ".";

import type { LegendData, FormFieldData } from "./types";

export const RadioButton = ({
  input = { type: "radio", variant: "default" },
  name,
  value,
  checked,
  onChange,
}: FormFieldData) => {
  const { variant } = input;

  console.log("Variant:", variant); // Debug log to check the variant value

  return (
    <label className="form__radio">
      <input
        className="form__radio--input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />

      <span className="form__radio--content flex ai-center gap-1">
        <span className="form__radio--content__label">{value}</span>
      </span>
    </label>
  );
};

const FormRadioSet = ({
  legend,
  data,
}: {
  legend: LegendData;
  data: FormFieldData[];
}) => {
  return (
    <FormFieldset legend={legend}>
      <ul className="form__radio--fieldset__list flex flex-col gap-2">
        {data.map((fieldData) => (
          <FormField
            key={fieldData.value}
            input={{ type: "radio", variant: "default" }}
            containerElement="li"
            name={fieldData.name}
            value={fieldData.value}
            checked={fieldData.checked}
            onChange={fieldData.onChange}
          />
        ))}
      </ul>
    </FormFieldset>
  );
};

export default FormRadioSet;
