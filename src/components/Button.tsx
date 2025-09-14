interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button = ({
  type = "button",
  onClick,
  children,
  className,
  variant = "primary",
}: ButtonProps) => {
  className = `btn btn__${variant} ${className || ""}`.trim();

  if (children) {
    return (
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      Start Here!
    </button>
  );
};

export default Button;
