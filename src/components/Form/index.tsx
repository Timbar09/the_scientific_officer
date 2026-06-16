import FormField from "./FormField";
import FormFieldset from "./FormFieldSet";

import type { ReactNode } from "react";

interface FormProps {
  children?: ReactNode;
  className?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, onSubmit, className }: FormProps) => {
  return (
    <form className={`form ${className || ""}`} onSubmit={onSubmit}>
      <div className="form__container">{children}</div>
    </form>
  );
};

export { Form, FormFieldset, FormField };
