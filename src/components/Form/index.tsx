import FormField from "./FormField";
import FormFieldset from "./FormFieldSet";

import type { ReactNode } from "react";

const Form = ({
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

export { Form, FormFieldset, FormField };
