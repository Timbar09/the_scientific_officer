import { NavLink } from "react-router";

import Icon from "./Icon";

export interface IconProps {
  name: string | null;
  position?: "left" | "right";
}

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  to?: string;
  variant?: "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  className?: string;
  icon?: IconProps;
  onClick?: () => void;
}

/**
 * Button Component
 * @param {ButtonProps} props - Props for the Button component
 * @param {("button" | "submit" | "reset")} [props.type="button"] - The type of button
 * @param {string} [props.to] - The URL to navigate to when the button is clicked (if provided, renders as a NavLink)
 * @param {("primary" | "secondary" | "tertiary")} [props.variant="primary"] - The variant style of the button
 * @param {React.ReactNode} [props.children] - The content of the button
 * @param {string} [props.className=""] - Additional CSS classes for the button
 * @param {IconProps} [props.icon] - Icon object containing name and position (if any)
 * @param {string | null} props.icon.name - The name of the icon to display
 * @param {("left" | "right")} [props.icon.position="left"] - The position of the icon relative to the text
 * @param {() => void} [props.onClick] - Click event handler for the button
 * @returns
 */

const Button = ({
  type = "button",
  to,
  variant = "primary",
  children = `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Button`,
  className = "",
  icon,
  onClick,
}: ButtonProps) => {
  if (icon && !icon.position) {
    icon.position = "left";
  }

  const variantClasses = `btn btn__${variant}`;
  const flexClasses = "flex ai-center gap-1";
  const iconClasses = `${
    icon
      ? icon.position?.toLocaleLowerCase() === "left"
        ? "p-inline-end-4"
        : "p-inline-start-4 flex-row-reverse"
      : "p-block-1 p-inline-3"
  }`;
  className =
    `${variantClasses} ${className} ${flexClasses} ${iconClasses}`.trim();

  if (to) {
    return (
      <NavLink to={to} className={className} onClick={onClick}>
        {icon && (
          <span className="btn__icon grid">
            <Icon name={icon.name || ""} />
          </span>
        )}
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {icon && (
        <span className="btn__icon grid">
          <Icon name={icon.name || ""} />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
