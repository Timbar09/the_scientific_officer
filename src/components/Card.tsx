import Icon from "@components/Icon";

import type { IconProps } from "./Button";

interface CardProps {
  size?: "small" | "medium";
  icon?: IconProps;
  title?: string;
  text?: string;
}

const Card = ({ icon, title, text, size = "medium" }: CardProps) => {
  const flexDirectionClass = size === "medium" ? "flex-col" : "flex-row";

  return (
    <div
      className={`card card__${size} flex ${flexDirectionClass} ai-start gap-3`}
    >
      {icon && (
        <span className={`card__icon card__${size}--icon grid`}>
          <Icon name={icon.name || ""} />
        </span>
      )}

      <div className={`card__${size}--text flex flex-col`}>
        {title && (
          <h3 className={`card__title card__${size}--title`}>{title}</h3>
        )}

        {text && (
          <p className={`card__text card__${size}--description`}>{text}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
