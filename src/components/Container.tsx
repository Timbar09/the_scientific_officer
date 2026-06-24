interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Container = ({ children, className, size = "md" }: ContainerProps) => {
  const classNames = className ? ` ${className}` : "";
  const sizeClasses = {
    sm: "container__small",
    md: "container__medium",
    lg: "container__large",
    xl: "container__extraLarge",
  };

  return (
    <div className={`container${classNames} ${sizeClasses[size]}`}>
      {children}
    </div>
  );
};

export default Container;
