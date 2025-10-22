import { NavLink } from "react-router";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  to?: string;
  variant?: "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

const Button = ({
  type = "button",
  to,
  variant = "primary",
  children = `${variant.charAt(0).toUpperCase()}${variant.slice(1)} Button`,
  className = "",
  icon,
  iconPosition = "left",
  onClick,
}: ButtonProps) => {
  const variantClasses = `btn btn__${variant}`;
  const flexClasses = "flex ai-center gap-1";
  const iconClasses = `${
    icon
      ? iconPosition.toLocaleLowerCase() === "left"
        ? "p-block-1 p-inline-start-1 p-inline-end-4"
        : "p-block-1 p-inline-start-4 p-inline-end-1 flex-row-reverse"
      : "p-block-1 p-inline-3"
  }`;
  // const iconClasses = `${icon ? "p-block-1" : "p-block-1 p-inline-3"}`;
  className =
    `${variantClasses} ${className} ${flexClasses} ${iconClasses}`.trim();

  if (to) {
    return (
      <NavLink to={to} className={className} onClick={onClick}>
        {icon && (
          <span className="btn__icon grid">
            <span className="material-symbols-outlined">{icon}</span>
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
          <span className="material-symbols-outlined">{icon}</span>
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
