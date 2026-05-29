import FormField from "./FormField";
import FormFieldset from "./FormFieldSet";

import type { ReactNode } from "react";

const Form = ({
  children,
  onSubmit,
  className,
}: {
  children?: ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className={`form ${className || ""}`} onSubmit={onSubmit}>
      <div className="form__container">{children}</div>
    </form>
  );
};

export { Form, FormFieldset, FormField };
