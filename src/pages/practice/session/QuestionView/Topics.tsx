import { useState } from "react";

import Icon from "../../../../components/Icon";

import { titlize } from "../../../../utils/titlize";

const BASE_CN = "practice__session--question__topic";

const Topics = ({ list }: { list: string[] }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const showTooltip = () => {
    setIsTooltipVisible(true);
  };

  const hideTooltip = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className={BASE_CN} aria-label="Topics Covered">
      <ToggleTopicsButton showTooltip={showTooltip} hideTooltip={hideTooltip} />

      {isTooltipVisible && (
        <div className={`${BASE_CN}--container p-2`}>
          <h3 className={`${BASE_CN}--title m-block-end-2`}>
            Topics Covered In This Session
          </h3>

          <ul className={`${BASE_CN}--list flex flex-wrap gap-1 ai-center`}>
            {list.map((topic) => (
              <li key={topic} className={`${BASE_CN}--item`}>
                {titlize(topic)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ToggleTopicsButton = ({
  showTooltip,
  hideTooltip,
}: {
  showTooltip: () => void;
  hideTooltip: () => void;
}) => {
  return (
    <span
      className={`${BASE_CN}--tooltipToggle grid`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      tabIndex={0}
    >
      <Icon name="info" />
    </span>
  );
};

export default Topics;
