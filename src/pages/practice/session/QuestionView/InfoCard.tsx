import type { InfoCardProps } from "../types";

import Icon from "../../../../components/Icon";

const InfoCard = ({
  display,
  classPrefix = "hint",
  icon,
  text,
}: InfoCardProps) => {
  const defaultClassName = "practice__session--question";
  const className = `${defaultClassName}__infoCard p-block-3 ${defaultClassName}__${classPrefix}`;

  const containerDefaultClassName =
    "practice__session--question__infoCard--container flex gap-1";
  const containerClassName = `${containerDefaultClassName} ${defaultClassName}__${classPrefix}--container`;

  const iconDefaultClassName =
    "practice__session--question__infoCard--icon flex ai-center jc-center p-1";
  const iconClassName = `${iconDefaultClassName} ${defaultClassName}__${classPrefix}--icon`;

  const textDefaultClassName =
    "practice__session--question__infoCard--text p-1";
  const textClassName = `${textDefaultClassName} ${defaultClassName}__${classPrefix}--text`;

  return (
    <>
      {display && (
        <div className={className}>
          <div className={containerClassName}>
            <p className="sr-only">Hint</p>

            {icon && (
              <div className={iconClassName}>
                <Icon name={icon} className="practice__session--icon" />
              </div>
            )}

            <p className={textClassName}>{text}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoCard;
