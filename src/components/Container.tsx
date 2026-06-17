interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Container = ({ children, className, size = "md" }: ContainerProps) => {
  const sizeClasses = {
    sm: "container__small",
    md: "container__medium",
    lg: "container__large",
    xl: "container__extraLarge",
  };

  return (
    <div className={`container ${className} ${sizeClasses[size]}`}>
      {children}
    </div>
  );
};

export default Container;
