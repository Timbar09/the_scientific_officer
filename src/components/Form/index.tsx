import FormField from "./FormField";
import FormFieldset from "./FormFieldSet";
import FormRadioSet from "./FormRadioSet";

import type { ReactNode } from "react";

export const Form = ({
  children,
  onSubmit,
}: {
  children?: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__container">{children}</div>
    </form>
  );
};

export default { Form, FormFieldset, FormField, FormRadioSet };
