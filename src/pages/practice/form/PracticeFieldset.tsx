import React from "react";

interface PracticeFieldsetProps {
  children: React.ReactNode;
  legend: string;
}

const PracticeFieldset = ({ children, legend }: PracticeFieldsetProps) => {
  return (
    <fieldset className="practice__fieldset p-block-2 p-inline-3 m-block-start-2">
      <legend className="practice__fieldset--legend">{legend}</legend>
      {children}
    </fieldset>
  );
};

export default PracticeFieldset;
