import { useEffect, useRef, useState } from "react";

const PracticeRadioButtons = () => {
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
    <fieldset className="practice__fieldset p-3 m-block-start-4">
      <legend className="practice__legend">Select Type of Questions:</legend>
      <div className="practice__radio--list flex flex-wrap p-1">
        {questionTypes.map(({ id, name }) => (
          <label
            ref={id === activeRadio ? radioRef : null}
            key={id}
            className="practice__radio--item grid"
            onClick={() => setActiveRadio(id)}
          >
            <input
              type="radio"
              name="questionType"
              defaultChecked={id === 1}
              value={name.toLowerCase()}
            />{" "}
            <span className="practice__radio--item__name p-block-1 p-inline-3">
              {name}
            </span>
          </label>
        ))}
        <div className="practice__radio--slider" style={sliderStyle}></div>
      </div>
    </fieldset>
  );
};

export default PracticeRadioButtons;
