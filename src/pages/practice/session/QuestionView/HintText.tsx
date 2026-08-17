import type { HintTextProps } from "../types";

import Icon from "../../../../components/Icon";

const HintText = ({ enabled, isRevealed, text }: HintTextProps) => {
  return (
    <>
      {enabled && isRevealed ? (
        <div className="practice__session--question__hint m-block-2 flex ai-center">
          <p className="sr-only">Hint</p>

          <div className="practice__session--question__hint--icon flex ai-center jc-center p-1">
            <Icon name="lightbulb_2" className="practice__session--icon" />
          </div>

          <p className="practice__session--question__hint--message p-1">
            {text}
          </p>
        </div>
      ) : null}
    </>
  );
};

export default HintText;
