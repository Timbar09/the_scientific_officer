import { useEffect, useRef, useState } from "react";

import PracticeFieldset from "./PracticeFieldset";

const PracticeType = () => {
  const radioRef = useRef<HTMLLabelElement>(null);
  const [activeRadio, setActiveRadio] = useState(1);
  const [sliderStyle, setSliderStyle] = useState({
    left: "0px",
    width: "0px",
  });

  const questionTypes = [
    { id: 1, name: "Multiple Choice" },
    { id: 2, name: "True/False" },
    { id: 3, name: "Detailed Answer" },
  ];

  useEffect(() => {
    if (radioRef.current) {
      setSliderStyle({
        left: `${radioRef.current.offsetLeft}px`,
        width: `${radioRef.current.clientWidth}px`,
      });
    }
  }, [activeRadio]);

  return (
    <PracticeFieldset legend="Select Type of Questions:">
      <div className="practice__type--list flex flex-wrap p-1">
        {questionTypes.map(({ id, name }) => (
          <label
            ref={id === activeRadio ? radioRef : null}
            key={id}
            className="practice__type--item grid"
            onClick={() => setActiveRadio(id)}
          >
            <input
              className="custom-input"
              type="radio"
              name="questionType"
              defaultChecked={id === 1}
              value={name.toLowerCase()}
            />{" "}
            <span className="practice__type--item__name custom-input__name p-block-1 p-inline-3">
              {name}
            </span>
          </label>
        ))}
        <div className="practice__type--slider" style={sliderStyle}></div>
      </div>
    </PracticeFieldset>
  );
};

export default PracticeType;
